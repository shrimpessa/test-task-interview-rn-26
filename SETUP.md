# Настройка окружения и сборка проекта

Этот документ описывает, что нужно установить на новой машине, чтобы собрать и запустить `host` + `MicroFront` на iOS-симуляторе, а также известные проблемы совместимости и их обход.

## 1. Требуемое окружение

| Инструмент | Версия | Зачем |
|---|---|---|
| Node.js | >= 22 (проверено на 24.15.0) | сборка JS/TS, Metro/Rspack |
| pnpm | 9.15.3 (зафиксировано в `packageManager` в корневом `package.json`) | менеджер monorepo-зависимостей |
| Ruby | >= 2.6.10 (проверено на 3.3.6) | CocoaPods для iOS |
| Bundler + CocoaPods | ставится через `Gemfile` каждого RN-пакета | нативные iOS-зависимости |
| Xcode | 16+ (проверено на 26.5) | сборка и запуск на iOS-симуляторе |
| CLI Xcode Command Line Tools | должны быть выбраны через `xcode-select` | компиляция нативного кода |

В рамках этой задачи собирала только iOS, поэтому Android-часть здесь не описана.

### Установка pnpm

Node уже дает `corepack`, которым удобно поставить именно закрепленную версию:

```bash
corepack enable
corepack prepare pnpm@9.15.3 --activate
```

### Локаль (для CocoaPods)

Если в shell не заданы `LANG`/`LC_ALL`, `pod install` может упасть с ошибкой `Encoding::CompatibilityError: Unicode Normalization not appropriate for ASCII-8BIT`. Перед командами CocoaPods выставляйте:

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

## 2. Установка зависимостей

```bash
pnpm install
```

Эта команда установит зависимости для всех пакетов monorepo (`host`, `MicroFront`,`sdk`, `ui-kit`) и соберет `ui-kit/dist` из `ui-kit/src`. Собранный `dist/` не хранится в git (см. `.gitignore`) -- он всегда пересобирается локально, чтобы не тащить в репозиторий абсолютные пути и sourcemap с чужой машины.

## 3. CocoaPods (iOS)

Устанавливаются отдельно для `host` и `MicroFront`, у каждого свой `ios/`:

```bash
cd packages/host
bundle install
cd ios && LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec pod install
cd ../../MicroFront
bundle install
cd ios && LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec pod install
```

Корневой скрипт `pnpm pods` (`pnpm -r pods`) на данный момент не сработает -- в `package.json` пакетов `host`/`MicroFront` нет отдельного `pods`-скрипта, поэтому CocoaPods нужно ставить вручную, как показано выше.

### Ошибка: `ArgumentError - pathname contains null byte`

Если столкнулись -- удалите `Pods/` и `Podfile.lock` и повторите `pod install`:

```bash
rm -rf Pods Podfile.lock
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec pod install
```

### Ошибка сборки `fmt`/`consteval` на новых Xcode

На Xcode 26.4+ сборка падает с ошибками вида:

```
error call to consteval function 'fmt::basic_format_string<...>::basic_format_string<FMT_COMPILE_STRING, 0>' is not a constant expression
```

Это несовместимость версии `fmt` 11.0.2 (тянется через React Native/RCT-Folly) с более строгой проверкой `consteval` в новом clang -- актуально пока RN не обновит vendored `fmt`. Обход уже встроен в `post_install` обоих `Podfile` (`packages/host/ios/Podfile`, `packages/MicroFront/ios/Podfile`). Если увидите эту ошибку -- проверьте, что патч в `Podfile` на месте, и пересоздайте `Pods` (`rm -rf Pods Podfile.lock && pod install`).

## 4. Запуск dev-серверов

```bash
pnpm start
```

Если нужно поднять процессы по отдельности (например, в фоне/скриптах):

```bash
pnpm --filter host start        # Metro/Rspack dev-сервер host, порт 8081
pnpm --filter microFront start  # Metro/Rspack dev-сервер MicroFront, порт 9002
pnpm --filter ui-kit dev        # watch-сборка ui-kit (babel + tsc --watch)
```

## 5. Сборка и запуск на iOS-симуляторе

При поднятых dev-серверах (шаг 4):

```bash
pnpm run:host:ios
```

или напрямую с указанием симулятора, например:

```bash
pnpm run:host:ios --simulator "iPhone 17 Pro"
```

Это соберет нативную часть `host` через Xcode, установит и запустит приложение на симуляторе. `host` внутри себя подгружает `MicroFront` как удаленный модуль с dev-сервера на порту 9002 -- поэтому до сборки должен быть запущен `pnpm --filter microFront start`.

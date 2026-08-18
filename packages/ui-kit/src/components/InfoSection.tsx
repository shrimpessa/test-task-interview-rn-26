import React from 'react';
import { Section } from './Section';
import { Row } from './Row';
import { DividedList } from './DividedList';

export type TInfoRow = {
  label: string;
  value: string;
  onPress?: () => void;
};

type TInfoSectionProps = {
  title: string;
  rows: TInfoRow[];
};

// общая обертка для инфоблоков "Основная информация", "Контакты" и "Часовой пояс"
export const InfoSection = ({ title, rows }: TInfoSectionProps) => {
  return (
    <Section title={title}>
      <DividedList>
        {rows.map((row) => (
          <Row key={row.label} label={row.label} value={row.value} onPress={row.onPress} />
        ))}
      </DividedList>
    </Section>
  );
};

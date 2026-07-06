"use client";

import { Card, SimpleGrid, Text } from "@mantine/core";

import type { GuideLink } from "../content/guide-content";
import styles from "../styles/content.module.css";

export function LinkCardGrid({ links }: { links: GuideLink[] }) {
  return (
    <SimpleGrid
      className={styles["cardGrid"]}
      component="ul"
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing="md"
    >
      {links.map((link) => (
        <Card
          className={styles["card"]}
          component="a"
          href={link.href}
          key={link.href}
          padding="lg"
          withBorder
        >
          <Text className={styles["cardTitle"]}>{link.label}</Text>
          <Text c="dimmed" className={styles["cardDescription"]}>
            {link.description}
          </Text>
        </Card>
      ))}
    </SimpleGrid>
  );
}

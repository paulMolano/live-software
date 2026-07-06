"use client";

import {
  Anchor,
  AppShell,
  Container,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import type { ReactNode } from "react";

import { primaryNavigation, siteConfig } from "../content/site";
import styles from "../styles/layout.module.css";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AppShell className={styles["shell"]} padding={0}>
      <a className={styles["skipLink"]} href="#main-content">
        Skip to content
      </a>
      <AppShell.Header className={styles["header"]}>
        <Container className={styles["headerInner"]} size="lg">
          <Anchor className={styles["brand"]} href="/">
            <Text className={styles["brandName"]} component="span">
              {siteConfig.title}
            </Text>
            <Text className={styles["brandMeta"]} component="span">
              live-software playbook
            </Text>
          </Anchor>
          <Group
            aria-label="Primary navigation"
            className={styles["nav"]}
            component="nav"
            gap={4}
            justify="flex-end"
          >
            {primaryNavigation.map((item) => (
              <UnstyledButton
                className={styles["navLink"]}
                component="a"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </UnstyledButton>
            ))}
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container
          className={styles["main"]}
          component="main"
          id="main-content"
          size="lg"
          tabIndex={-1}
        >
          {children}
        </Container>
      </AppShell.Main>
      <footer className={styles["footer"]}>
        <Container className={styles["footerInner"]} size="lg">
          <Text c="dimmed" size="sm">
            Built as the living technical guide for live-software.
          </Text>
          <Anchor className={styles["footerLink"]} href={siteConfig.repositoryUrl}>
            GitHub repository
          </Anchor>
        </Container>
      </footer>
    </AppShell>
  );
}

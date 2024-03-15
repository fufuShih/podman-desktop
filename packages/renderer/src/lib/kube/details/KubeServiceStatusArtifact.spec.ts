/**********************************************************************
 * Copyright (C) 2023-2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import '@testing-library/jest-dom/vitest';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import KubeServiceStatusArtifact from './KubeServiceStatusArtifact.svelte'; // Adjust the import path as necessary
import type { V1ServiceStatus } from '@kubernetes/client-node';

const fakeServiceStatus: V1ServiceStatus = {
  loadBalancer: {
    ingress: [{ ip: '192.0.2.1' }, { hostname: 'example.com' }],
  },
};

test('Renders service status correctly', () => {
  render(KubeServiceStatusArtifact, { artifact: fakeServiceStatus });

  expect(screen.getByText('Status')).toBeInTheDocument();
  expect(screen.getByText('Load Balancer')).toBeInTheDocument();
  expect(screen.getByText('192.0.2.1')).toBeInTheDocument(); // Verifying the IP address is rendered
  expect(screen.getByText('example.com')).toBeInTheDocument(); // Verifying the hostname is rendered
});

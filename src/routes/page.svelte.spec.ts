import { page } from '@vitest/browser/context';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	describe('contents', async () => {
		beforeEach(() => {
			render(Page);
		});
		it('should render h1', async () => {
			const heading = page.getByRole('heading', { level: 1 });
			await expect.element(heading).toBeInTheDocument();
		});

		it('should contain a link to examples', async () => {
			const examplesLink = page.getByRole('link', {
				name: /examples/i
			});
			await expect.element(examplesLink).toBeInTheDocument();
		});
	});
});

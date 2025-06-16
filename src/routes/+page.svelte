<script lang="ts">
	type Url = {
		title: string;
		url: string;
	};

	type TestElement = {
		tagName: string;
		selector?: string;
		altText?: string;
		compliant: boolean;
		src?: string;
		isDecorative?: boolean;
	};

	type TestResult = {
		id: string;
		name: string;
		passed: boolean;
		elements?: TestElement[];
		error?: string;
	};

	type UrlResult = {
		url: string;
		tests: TestResult[];
	};

	type ApiResponse = {
		results: UrlResult[];
	};

	let currentContextLength = 0;
	let urls: Url[] = [{ title: '', url: '' }];
	let response: ApiResponse | null = null;
	let isLoading = false;

	async function handleSubmit() {
		isLoading = true;
		response = null;

		try {
			const res = await fetch('/api/scan', {
				method: 'POST',
				body: JSON.stringify(urls.map((u) => u.url))
			});

			response = await res.json();
		} catch (error) {
			console.error('Erreur:', error);
		} finally {
			isLoading = false;
		}
	}

	function addUrl() {
		urls = [...urls, { title: '', url: '' }];
		currentContextLength++;
	}

	function popUrl() {
		urls = urls.slice(0, -1);
		currentContextLength--;
	}
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full max-w-[1200px] rounded-lg bg-white p-8 shadow-lg"
	>
		<h1 class="mb-6 text-center text-2xl font-bold">Vérificateur d'accessibilité RGAA</h1>

		{#each urls as url, index}
			<div class="mb-4 flex items-center gap-4">
				<div class="flex-1">
					<div class="flex items-center gap-2">
						<input
							type="text"
							placeholder="Titre"
							class="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
							bind:value={url.title}
						/>
						<input
							type="url"
							id="url"
							bind:value={url.url}
							placeholder="https://exemple.com"
							class="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
							required
						/>
					</div>
				</div>
				{#if index === urls.length - 1}
					<button
						type="button"
						class="rounded-full bg-orange-500 p-2 text-white transition-colors hover:bg-orange-600"
						aria-label="Ajouter une page au contexte"
						on:click={addUrl}
					>
						<svg
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button>
					{#if index > 0}
						<button
							type="button"
							class="rounded-full bg-orange-500 p-2 text-white transition-colors hover:bg-orange-600"
							aria-label="Supprimer une page du contexte"
							on:click={popUrl}
						>
							<svg
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				{/if}
			</div>
		{/each}

		<button
			type="submit"
			class="w-full rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600 disabled:bg-orange-300"
			disabled={isLoading}
		>
			{isLoading ? 'Analyse en cours...' : "Lancer l'analyse RGAA"}
		</button>

		{#if response}
			<div class="mt-6">
				{#each response.results as urlResult}
					<div class="mb-6 rounded-md border p-4">
						<h4 class="text-lg font-bold">{urlResult.url}</h4>

						{#each urlResult.tests as test}
							<div
								class="mt-4 rounded p-3 {test.passed
									? 'bg-green-50'
									: 'bg-red-50'} border {test.passed ? 'border-green-200' : 'border-red-200'}"
							>
								<div class="mb-2 flex items-center gap-2">
									<span
										class="inline-block h-5 w-5 rounded-full {test.passed
											? 'bg-green-500'
											: 'bg-red-500'} flex items-center justify-center text-white"
									>
										{#if test.passed}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										{:else}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clip-rule="evenodd"
												/>
											</svg>
										{/if}
									</span>
									<span class="font-semibold">{test.id} - {test.name}</span>
									<span
										class="rounded px-2 py-1 text-sm {test.passed
											? 'bg-green-200 text-green-800'
											: 'bg-red-200 text-red-800'}"
									>
										{test.passed ? 'Conforme' : 'Non conforme'}
									</span>
								</div>

								{#if test.error}
									<div class="mt-2 text-sm text-red-600">
										<p>Erreur: {test.error}</p>
									</div>
								{/if}

								{#if test.elements && test.elements.length > 0}
									<div class="mt-3">
										<table class="w-full text-sm">
											<thead class="bg-gray-100">
												<tr>
													<th class="p-2 text-left">Élément</th>
													<th class="p-2 text-left">Alternative</th>
													<th class="p-2 text-left">Statut</th>
												</tr>
											</thead>
											<tbody>
												{#each test.elements as element}
													<tr class="border-t">
														<td class="p-2">
															<code class="rounded bg-gray-100 px-1 py-0.5">{element.tagName}</code>
															{#if element.src}
																<div class="mt-1 truncate text-xs text-gray-500">{element.src}</div>
															{/if}
														</td>
														<td class="p-2">
															{#if element.isDecorative}
																<span class="text-gray-500 italic">Image décorative (alt="")</span>
															{:else if element.altText}
																<span class="break-words">{element.altText}</span>
															{:else}
																<span class="text-red-500">Aucune alternative</span>
															{/if}
														</td>
														<td class="p-2">
															<span
																class="inline-block rounded px-2 py-1 text-xs {element.compliant
																	? 'bg-green-100 text-green-800'
																	: 'bg-red-100 text-red-800'}"
															>
																{element.compliant ? 'Conforme' : 'Non conforme'}
															</span>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</form>
</div>

const downloadButton = document.querySelector<HTMLButtonElement>('[data-download-pdf]');
const pdfDocument = document.querySelector<HTMLElement>('[data-pdf-document]');

const readyForPdf = async () => {
	if ('fonts' in document) {
		await document.fonts.ready;
	}

	const images = Array.from(document.images);
	await Promise.all(
		images.map((image) => {
			if (image.complete) return Promise.resolve();
			return new Promise<void>((resolve) => {
				image.addEventListener('load', () => resolve(), { once: true });
				image.addEventListener('error', () => resolve(), { once: true });
			});
		})
	);
};

if (downloadButton && pdfDocument) {
	downloadButton.addEventListener('click', async () => {
		const originalLabel = downloadButton.textContent ?? 'ดาวน์โหลด PDF ระดับปานกลาง';
		downloadButton.disabled = true;
		downloadButton.textContent = 'กำลังจัดทำ PDF...';

		try {
			await readyForPdf();
			const { default: html2pdf } = await import('html2pdf.js');

			await html2pdf()
				.set({
					filename: 'proton-path-medium-trails.pdf',
					margin: [8, 8, 8, 8],
					image: { type: 'jpeg', quality: 0.96 },
					html2canvas: {
						scale: 2,
						useCORS: true,
						backgroundColor: '#ffffff'
					},
					jsPDF: {
						unit: 'mm',
						format: 'a4',
						orientation: 'portrait'
					},
					pagebreak: {
						mode: ['css', 'legacy'],
						avoid: ['.pdf-trail-card', '.pdf-summary-grid > div']
					}
				})
				.from(pdfDocument)
				.save();
		} catch (error) {
			console.error('PDF generation failed', error);
			downloadButton.textContent = 'ดาวน์โหลดไม่สำเร็จ ลองใหม่';
			setTimeout(() => {
				downloadButton.textContent = originalLabel;
			}, 2500);
			return;
		} finally {
			downloadButton.disabled = false;
			if (downloadButton.textContent !== 'ดาวน์โหลดไม่สำเร็จ ลองใหม่') {
				downloadButton.textContent = originalLabel;
			}
		}
	});
}

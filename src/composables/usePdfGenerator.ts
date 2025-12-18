import html2pdf from 'html2pdf.js';

export function usePdfGenerator() {
  /**
   * Generate and download PDF from HTML element
   */
  const generatePdf = async (element: HTMLElement, fileName: string): Promise<void> => {
    try {
      const options = {
        margin: [0.75, 0.75, 0.75, 0.75],  // Top, Left, Bottom, Right margins in inches
        filename: fileName,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        html2canvas: {
          scale: 2.5,
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          windowHeight: element.scrollHeight,
          windowWidth: element.scrollWidth
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after'
        }
      };

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  /**
   * Generate PDF filename from resume name
   */
  const generateFileName = (name: string): string => {
    const sanitizedName = name.trim() || 'Resume';
    return `Resume_${sanitizedName.replace(/\s+/g, '_')}.pdf`;
  };

  return {
    generatePdf,
    generateFileName
  };
}

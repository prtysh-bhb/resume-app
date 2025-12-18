import html2pdf from 'html2pdf.js';

export function usePdfGenerator() {
  /**
   * Generate and download PDF from HTML element
   */
  const generatePdf = async (element: HTMLElement, fileName: string): Promise<void> => {
    try {
      const options = {
        margin: 0.5,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: {
          unit: 'in',
          format: 'letter',
          orientation: 'portrait'
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

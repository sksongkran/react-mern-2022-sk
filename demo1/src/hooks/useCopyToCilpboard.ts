type useCopyToClipboardResult = [
    isCopied: boolean,
    handleCopy: (text: number | string) => void
  ];
  export default function useCopyToClipboard(
    resetInterval: number
  ): useCopyToClipboardResult {
    return [false, () => {}];
  }
  
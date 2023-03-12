import sanitizeHtml, { IOptions } from "sanitize-html";

const defaultOptions = {
  allowedTags: ["b", "i", "em", "strong", "a"],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: ["www.youtube.com"],
};

export const sanitize = (dirty: string, options: IOptions | undefined) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
});

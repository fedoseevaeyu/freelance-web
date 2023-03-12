import axios from "axios";

export async function uploadFiles(files: File[], token: string) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  return await axios.post<{ paths: string[] }>("/api/upload/multiple", formData, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadFile(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post<{ path: string }>("/api/upload", formData, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

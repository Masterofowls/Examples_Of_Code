type SuccessResponse = {
  status: 'success';
  data: { id: number; title: string };
};

type ErrorResponse = {
  status: 'error';
  error: { code: number; message: string };
};

type ApiResponse = SuccessResponse | ErrorResponse;

const handleResponse = (response: ApiResponse): string => {
  if (response.status === 'success') {
    return `Loaded: ${response.data.title}`;
  }

  return `Error ${response.error.code}: ${response.error.message}`;
};

const responses: ApiResponse[] = [
  { status: 'success', data: { id: 1, title: 'Hello TS' } },
  { status: 'error', error: { code: 500, message: 'Server down' } },
];

responses.forEach((response) => {
  console.log(handleResponse(response));
});

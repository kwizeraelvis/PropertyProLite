const SUCCESS = 'success';
const ERROR = 'error';

const results = (status, data) => (([SUCCESS, 200].includes(status)) ? { status, data } : { status, error: data });

export { results, SUCCESS, ERROR };

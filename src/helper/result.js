const SUCCESS = 'success';
const ERROR = 'error';

const results = (status, message, data) => (([SUCCESS, 200].includes(status))
    ? { status, message, data } : { status, message, error: data });

export { results, SUCCESS, ERROR };

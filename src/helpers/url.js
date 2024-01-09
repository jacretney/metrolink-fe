const getUrl = (path) => {
    return `${process.env.REACT_APP_API_URL}${path}`;
}

export default getUrl;
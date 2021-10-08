const postData = async(url, data) => {
    const rel = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: data
    });
    return await rel.json();

};
const getResource = async(url) => {
    let rel = await fetch(url);
    if (!rel.ok) {
        throw new Error(`Cound not${url} status ${rel.status}`);
    }
    return await rel.json();

};
export { postData };
export { getResource };
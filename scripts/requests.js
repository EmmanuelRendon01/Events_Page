const URL_DATA = 'http://localhost:3000/'


/**
* fetch to create 
*/
export async function add(data, endpoint) {
    const res = await fetch(`${URL_DATA}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return await res.json();
}

/**
* fetch to delete
*/
export async function remove(endpoint, id) {
    const res = await fetch(`${URL_DATA}${endpoint}/${id}`, {
        method: "DELETE"
    })

    return res.ok;
}
/**
* fetch to get
*/
export async function get(endpoint) {

    const res = await fetch(`${URL_DATA}${endpoint}`);

    return await res.json();
}

/**
* fetch to update
*/
export async function update(data, endpoint, id) {
    const res = await fetch(`${URL_DATA}${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return await res.json();
}
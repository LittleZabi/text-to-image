const SERVER_ADDR = 'http://127.0.0.1:5000';


let qoutes = document.querySelectorAll(".qoute-wrap .qoute");
const images = document.querySelectorAll(".gallery img");

if (window.innerWidth > 1180) {
    qoutes = [...qoutes, ...images];
} else {
    qoutes = images;
}
let prev = [];
const createIndex = () => {
    const c = () => Math.floor(Math.random() * (qoutes.length - 1));
    let index = c();
    while (prev.includes(index)) {
        index = c();
    }
    prev.push(index);
    if (prev.length >= 5) prev.splice(0, 1);
    return index;
};
setInterval(() => {
    let index = createIndex();
    qoutes[index].classList.toggle("active");
}, 300);

let loading = false;
const handleRequest = async () => {
    if (loading === true) return 0
    loading = true
    const prompt = document.getElementById('text')
    const imagePlace = document.getElementById('image-view-cont')
    const downLink = document.getElementById('download-link')
    const button = document.getElementById('button')
    button.innerHTML = 'loading...'
    if (prompt.value === '') {
        alert("Please enter a prompt.")
        return 0
    }
    url = `${SERVER_ADDR}/api/?prompt=${prompt.value}`;
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            loading = false
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loading = false
            button.innerHTML = 'Generate'
            if (data.status === 'success') {
                let k = data.res
                imagePlace.innerHTML = `<img src="${SERVER_ADDR}/${k}">`
                downLink.innerHTML = `<a target="_blank" class="btn-v" href="${SERVER_ADDR}/api/image/?download=.${k}" download="image.jpg">Download</a>`
            } else {
                alert(data.message);
            }
            console.log(imagePlace)
        })
        .catch(error => {
            console.error('Fetch error:', error);
            button.innerHTML = 'Generate'
        });
}

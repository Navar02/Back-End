window.onload = inicializar

function inicializar() {
    const lista = document.getElementById('lista');
    const input = document.getElementById('input');

    const upload = document.getElementById('upload');
    const download = document.getElementById('download');
    const deleteAll = document.getElementById('deleteAll');
    let add=[]
    input.addEventListener('keydown', function (e) {
        const li = document.createElement('li');

        if (e.key == "Enter") {
            let valorDelInput = e.target.value
            add.push(valorDelInput)
            let jason={"texto":add}
            localStorage.setItem("texto", JSON.stringify(jason))
            li.innerHTML = valorDelInput;
            lista.appendChild(li);
            e.target.value = ""
            e.target.focus()
        }
    });

    deleteAll.addEventListener('click', function (e) {
        lista.innerHTML = '';
        localStorage.clear();
        add=[];
    })

    upload.addEventListener('click', function (e) {
        let elemento = e.target.value;
        fetch('/form.html',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: localStorage.getItem("texto")
            }).then(r => r.text())
            .then(r => console.log(r))
    })

    download.addEventListener('click', async function (e) {
        let response = await fetch(`/sata.txt`).then(res=>res.json())
        response=response.texto;
        console.log(response)
        response.forEach(e=>{
            var li = document.createElement('li');
            let jason={"texto":add}
            add.push(e)
            localStorage.setItem("texto", JSON.stringify(jason))
            li.innerHTML = e;
            lista.appendChild(li);
        })
    })
}

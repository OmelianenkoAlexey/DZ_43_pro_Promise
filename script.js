// XMLHttpRequest
// GET, POST, PUT, PATCH, DELETE
// ! способ 1

// function requestData(method, action, callback) {
//     const xml = new XMLHttpRequest();
//     xml.open(method, action);
//     xml.send();

//     let parse = response => JSON.parse(response);

//     xml.addEventListener("readystatechange", () => {
//         if(xml.readyState === 4 && xml.status === 200) {
//             const response = parse(xml.response).data;

// console.log(parse(xml.response).data);

//             callback(response);     
//         }
//     })
// }
// let fruits = [];

// function renderElem(response) {
//     response.forEach(item =>  console.log(item));
//     fruits = response;
// }


// function renderFriends(response) {
//         const wrapp = document.querySelector(".wrapp");

//     response.forEach((user, i) => {
//         const div = document.createElement("div");
//         const img = document.createElement("img");
//         const h3 = document.createElement("h3");
//         const p = document.createElement("p");
//         const h4 = document.createElement("h4");


//         div.classList.add("card");
//         p.classList.add("age");

//         img.src = user.avatar;
//         h3.innerText = user.name;
//         p.innerText = `Hi! I'm ${user.age} years old.`;
//         h4.innerText = fruits[i];

//         div.append(img);
//         div.append(h3);
//         div.append(p);
//         div.append(h4);
//         wrapp.append(div);
//     });
// }

// requestData("GET", "request/fileA.json", renderElem);
// requestData("GET", "request/fileB.json", renderFriends);

// console.log("Meow!");
// for(let i = 0; i < 10; i++) {
//     console.log(i);
// }

// !!!!!!!!!!!!!!!!!!!!!!!
// ! способ 2

let parse = response => JSON.parse(response);

function requestData(method, action) {
    const xml = new XMLHttpRequest();
    xml.open(method, action);
    xml.send();

    return new Promise((resolve, reject) => {
        xml.addEventListener("readystatechange", () => {
            if (xml.readyState === 4) {
                xml.status >= 200 && xml.status < 400
                    ? resolve(parse(xml.response).data) : reject(xml.status);
            }
        })
    });
}

// вызываем функцию (в результате на приходит ответ промис)
requestData("GET", "request/fileA.json")
    .then(
        data => {
            console.log(data);
            return data;
        }
    )
    .then(
        fruit => {
            console.log(fruit);
            // вызываем функцию (в результате на приходит ответ промис)
            requestData("GET", "request/fileB.json")
                .then(
                    data => {
                        const wrapp = document.querySelector(".wrapp");

                        data.forEach((user, i) => {
                            const div = document.createElement("div");
                            const img = document.createElement("img");
                            const h3 = document.createElement("h3");
                            const p = document.createElement("p");
                            const h5 = document.createElement("h5");

                            div.classList.add("card");
                            p.classList.add("age");

                            img.src = user.avatar;
                            h3.innerText = user.name;
                            p.innerText = `Hi! I'm ${user.age} years old.`;
                            h5.innerText = `My favorite fruit is ${fruit[i]}`;

                            div.append(img);
                            div.append(h3);
                            div.append(p);
                            div.append(h5);
                            wrapp.append(div);
                        });
                    }
                )
        }
    )
    // выводит ответ в случае ошибки или отрицательного результата
    .catch(err => console.log(err));

async function main(){
    const countContainer = document.querySelector('#count-container');
    const refreshButton = document.querySelector("#refresh-button")
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

    let response = await fetch("http://localhost:9001/counter");
    let jsonData = await response.json();

    let initCountValue = jsonData.value
    let countValue = initCountValue;

    setInterval(async ()=>{
        let sync_response = await fetch("http://localhost:9001/counter");
        countValue = (await sync_response.json()).value;
        countContainer.textContent = countValue;
    }, 200) //Set to 100-500ms


    function refresh(){
        countValue = initCountValue;
        countContainer.textContent = countValue;
        update()
    }

    async function update(){
        await fetch("http://localhost:9001/counter", {
            method:"PATCH",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({'value': String(countValue)})
        });
    }

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
        update();
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        update();
    }

    refreshButton.addEventListener('click', refresh)
    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    countContainer.textContent = countValue;
}
main()
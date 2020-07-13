'use strict'

//Main Container Div tag
let container = document.getElementById('container')
let childcontainer = document.getElementById('childcontainer')

//Fetch API to featch the json data from server
const rooturl = 'http://localhost:3000/api/book/maths'


function readData(url){
const fetchPromise = fetch(url)
fetchPromise.then(res => {
    return res.json()
}).then(data =>{
    useData(data.response); //Calling Function with parameter of json data
})
.catch(err => err) 
}
readData(rooturl)

function useData(data){

    //Sorting the object according to sequenceNo
    var byDate = data.slice(0);
    byDate.sort(function(a,b) {
	return a.sequenceNO - b.sequenceNO;
    })

    //Iterating through the object  
    let len = data.length;
    for(let i=0;i<len;i++) {

        let card = document.createElement('div')
        card.addEventListener('click',function(){
            childData(data[i].id)
        })
        card.classList.add('card')
        card.innerHTML = `
            <div class='title'>${data[i].title}</div>
            <div class='lession'>Number Of Lessons : ${data[i].childrenCount}</div>
            <div class='status'>${check(data[i].completeCount)}</div>
          `
          container.appendChild(card); 
    }

}

function childData(id){
    //e.preventDefault()
    const childurl = 'http://localhost:3000/api/book/maths/section/'+ id
    //console.log(childurl);
    function readData(url){
        const fetchPromise = fetch(url)
        fetchPromise.then(res => {
            return res.json()
            
        }).then(data =>{
            useChildrenData(data); 
        })
        .catch(err => err) 
        }
        readData(childurl)
    }

    function useChildrenData(data){
            console.log (data)
            //Sorting the object accoring to sequenceNo
            var byDate = data[0].slice(0);
            byDate.sort(function(a,b) {
            return a.sequenceNO - b.sequenceNO;
            })

            //Iterating through the object and 
            let len = data.length;
            console.log(len);
            for(var i=0;i<len;i++){
                let card = document.createElement('div')

                card.innerHTML = `
                    <div class='title'>${data[i].title}</div>
                    <div class='lession'>${data[i].childrenCount}</div>
                    <div class='status'>${check(data[i].completeCount)}</div>
                  `
                  childcontainer.appendChild(card); 
            }
}

//Comparing the progress
let check =(status) => {
    if(status == 0){
        return 'Not Started'
    }else if (status > 0 && status <10){
        return 'In Progress'
    } else {
        return 'Completed'
    }
}

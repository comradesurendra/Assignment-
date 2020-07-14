'use strict'

let container = document.getElementById('container')//------------------------------------------Main Container
let modal = document.getElementById('modal')//----------------------model container for child data

//--------------------------------------Fetch API to featch the json data from server
const rooturl = 'http://localhost:3000/api/book/maths'

//--------------------------------Root Page--------------------------------------------------------------
function readData(url){
const fetchPromise = fetch(url)
fetchPromise.then(res => {
    return res.json()
}).then(data =>{
    useData(data.response); //---------------Using Function call with parameter to pass the json response data
})
.catch(err => err) 
}
readData(rooturl)

function useData(data){
    
    //-----------------Sorting the object according to sequenceNo---------------
    var byDate = data.slice(0);
    byDate.sort(function(a,b) {
	return a.sequenceNO - b.sequenceNO;
    })

    //------------------------------Iterating through the object-----------------  
    let len = data.length;
    for(let i=0;i<len;i++) {

        let card = document.createElement('div')
        //----------------------------------------Added Event Listner to Every Card--------------------------
        
        card.classList.add('card')
        card.innerHTML = `
            <div class='title'><a href='#result'>${data[i].title}</a></div>
            <div class='type'>Number Of Lessons : ${data[i].childrenCount}</div>
            <div class='status'>${check(data[i].completeCount)}</div>
          `
          container.appendChild(card);

          card.addEventListener('click',() => {
            childData(data[i].id)
            // window.document.location='/children.html'
        })
    }

}

//------------------------------------Child Page-------------------------------------------------------------

function childData(id){

    let childurl = 'http://localhost:3000/api/book/maths/section/'+ id

    function readData(url){
        const fetchPromise = fetch(url)
        fetchPromise.then(res => {
            return res.json()
        }).then(data =>{
            useChildrenData(data.response[id]); 
        }).catch(err => err) 
        }
        readData(childurl)
    }

    function useChildrenData(data){
            //-----------------------Iterating through the object and 
            let len = data.length;
            for(var i=0;i<len;i++){
                let childCard = document.createElement('div')
                childCard.classList.add('child-card')

                childCard.innerHTML = `
                    <div class='title'>${data[i].title}</div>
                    <div class ='type'>${data[i].type}</div>
                    <div class ='status'>${data[i].status}</div>
                `
                modal.appendChild(childCard)

                childCard.addEventListener('click',() =>{
                    window.location.reload()
                })
            }
}

//------------------------Comparing the progress
let check =(status) => {
    if(status == 0){
        return 'Not Started'
    }else if (status > 0 && status <10){
        return 'In Progress'
    } else {
        return 'Completed'
    }
}

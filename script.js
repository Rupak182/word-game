// console.log('Working');

let tries = Array.from(document.querySelector(".tries").children);
let word ;
let generateWord = async()=>{
    let data =await fetch("https://random-word-api.herokuapp.com/word");
    console.log("hello")

    let res = await  data.json();
    console.log(res[0]);
    return res[0];
} 

let count=5 ;
let correct=0;


const generateJumbled = (word) => {
    let jumbledArray = [];

    let n = word.length;
    let index = 0;
    let wordArr = [...word];

    // console.log(wordArr)
    for (let i = n - 1; i >= 0; i--) {
        let random = Math.floor(Math.random() * wordArr.length);
        jumbledArray.push(wordArr[random])
        index++;
        wordArr.splice(random, 1);
    }
    let jumbledWord = jumbledArray.toString().replace(/,/g, '');
    console.log(jumbledWord);
    return jumbledWord
}

let showWord= async()=>{
    let textbox=document.querySelector(".word");
    word =await generateWord();
    let res=generateJumbled(word);
    makeBoxes();
    takeinput();
    reset();
    textbox.innerText=res;
}

let generateRandom = ()=>{
    let random= document.querySelector(".random");
    random.addEventListener(("click"),()=>{
        reset();
        showWord();
    });
}


let makeBoxes = ()=>{
    let buttons = document.querySelector('.char');
    let size =word.length;
    buttons.innerHTML="";
    for (let i = 0; i < size; i++) {
        let btn = document.createElement("button");
        btn.classList.add("border-[3px]","rounded-md" ,"border-[#4A5567]" , "p-5" , "py-2", "outline-none");
        
        btn.innerText="_";
        buttons.append(btn);
    }
}

let checkSuccess = ()=>{
    
    setInterval(() => {
        let buttons = Array.from(document.querySelector('.char').children);
        
        let charCount=0;
        
        buttons.forEach((button)=>{
            if(button.innerText != "_")
            charCount++;
        })
    
        if(word && charCount==word.length && correct>=word.length)
        {
            alert("Success");
            reset();
            showWord();
        }


    }, 500);
}

let takeinput= ()=>{
    let buttons = Array.from(document.querySelector('.char').children);
    buttons.forEach((btn,index)=>{
        btn.addEventListener("keydown",(e)=>{
            let character=e.key;
            btn.innerText=character;
            console.log(index);
            if(word[index]!=character)
            {

                tryChange();
                count--;
                listMistakes(character);
                btn.style.borderColor ="red"


                if(count==0)
                {
                    reset();
                    alert("All Tries used");
                    showWord();
                }
            }

            else
            {
                btn.style.borderColor ="#672171"
                correct++;
            }



        });
    });
}

let tryChange = ()=>{
    let tries = Array.from(document.querySelector(".tries").children);
    let circle = tries[count];
    circle.style.backgroundColor = "#4A5567";
}


let resetCaller = ()=>{
    let btn = document.querySelector(".reset");
    btn.addEventListener("click",()=>{
        reset();
    });
}

let reset = ()=>{
    let tries = Array.from(document.querySelector(".tries").children);
    tries.forEach((t,index) =>{
        if(index==0)
        {
            t.innerText=`Tries(${count}/${count})`
        }
        else
        {
            t.style.backgroundColor="#C951E7"
        }
    })

    let mistake=document.querySelector(".mistake");

    mistake.innerText="";
    let buttons = Array.from(document.querySelector('.char').children);

    buttons.forEach((button)=>{
        button.innerText="_";
    })

    count=5;

    correct=0;

}



let listMistakes = (m)=>{
    let mistake=document.querySelector(".mistake");
    if(mistake.innerText.length===0)
    mistake.innerText = m;

    else
        mistake.innerText = mistake.innerText + `,${m}`;
}

checkSuccess();
showWord();
resetCaller();
generateRandom();

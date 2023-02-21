const n=50;
const array=[];
reset();

//initializing array
function reset(){
    for(let i =0; i<n;i++){
        array[i] = Math.floor(Math.random()*100)+5;
    }
    showBar();
}

                                                                                    //selection sort start

function selection(){
    const copy=[...array];
    const moves=selectionSort(copy);
    animate(moves);
}

function selectionSort(array){
    const moves=[];
    var flag=false;
    for(let i=0;i<array.length-1;i++){
        let min =i;
        for(let j=1+i;j<array.length;j++){
            moves.push({indices:[i,min],type:"comp"});
            if(array[j]<array[min]){
                min=j;
                flag=true;
            }
        }
        if(!flag)break;
        moves.push({indices:[i,min],type:"swap"});
        [array[i],array[min]]=[array[min],array[i]];
    }
    return moves;
}
                                                                                    //selection sort end

                                                                                    //bubble sort start
function bubble(){
    const copy=[...array];
    const moves=bubbleSort(copy);
    animate(moves);
}

function bubbleSort(array){
    const moves=[];
   for(let i=0;i<array.length;i++){
    var flag=false;
    for(let j=0;j<array.length-1-i;j++){
        moves.push({indices:[j,j+1],type:"comp"});
        if(array[j]>array[j+1]){
            flag=true;
            moves.push({indices:[j,j+1],type:"swap"});
            [array[j],array[j+1]]=[array[j+1],array[j]];
        }
    }
    if(!flag)break;
   }
    return moves;
}
                                                                                    //bubble sort ends

function insertion(){
    const copy=[...array];
    const moves = insertionSort(copy);
    animate(moves);
}
function insertionSort(array){
    const moves=[];

    for(let i=1;i<array.length;i++){
        let j=i-1;
        moves.push({indices:[j,j+1],type:"comp"});
        while(j>=0 && array[j]>array[i]){
            moves.push({indices:[j,j+1],type:"swap"});
            [array[j],array[j+1]]=[array[j+1],array[j]];
            j--;
        }
    }

    return moves;
}
                                                                                    //Insertion sort end

function heap(){
    const copy=[...array];
    let n =array.length;
    const arr=[];
    const moves = heapSort(copy,n,arr);
    animate(moves);
}

function heapSort(array,n ,arr){

    if(n==1)return arr ;
    
    for(let i =(n-1)/2;i>=0;i--){
        i=Math.floor(i);
        let left=(i*2)+1;
        let right=(i*2)+2;
        let largest=i;
        arr.push({indices:[i,largest],type:"comp"});
        if(left<n && array[left]>array[largest])largest=left;
        if(right<n && array[right]>array[largest])largest=right;
        if(largest!=i){
            arr.push({indices:[i,largest],type:"swap"});
            [array[i],array[largest]]=[array[largest],array[i]];        
        }
       
    }
        n=n-1; 
        arr.push({indices:[0,n],type:"swap"});
        [array[0],array[n]]=[array[n],array[0]];
        heapSort(array,n,arr);
        return arr;
}


                                                                                    //showing array to screen
function showBar(move){
    
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar= document.createElement("div");
        bar.style.height=array[i]+"%";
        bar.style.width="15px";
        bar.style.margin="0.2px";
        bar.style.backgroundColor="white";
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
            move.type=="swap"?"red":"blue";
            
        }
        container.appendChild(bar);
    }
}
                                                                                        //animate
function animate(moves){
    if(moves.length==0){
        showBar();
        return;
    }
    const move=moves.shift();
    const [i,j]=move.indices;
    if(move.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]];
    }
    showBar(move);
    setTimeout(function(){
        animate(moves);
    },100);
}
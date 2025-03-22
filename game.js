var arrColors = ["green", "red", "yellow", "blue"];
var arrBotoes = [];
var botoesClicados = [];
var rodada = 1;
var rodadaAtual = 0;
var started = false;
var controleSequencia = 0;
var showingSequence = false;
var sound = new Audio();

$(document).on("keydown", gameStart);
$(".btn").on("click", handleSequence);

function gameStart(){
    if(!started){
        started = true;
        $("h1").text("Level " + rodada);
        addOnSequence();
        showSequence();
    }
}

function addOnSequence(){
    $("h1").text("Level " + rodada);

    var botaoPop = Math.floor(Math.random() * 4);
    var btnColor = arrColors[botaoPop];
    arrBotoes.push(btnColor);
}

function showSequence(){
    showingSequence = true;
    var color = arrBotoes[controleSequencia];

    playSound(color);
    $("#" + color).fadeTo('fast', 0.1).fadeTo('slow', 1.0);

    controleSequencia++;
    if(controleSequencia < arrBotoes.length){
        setTimeout(function() {
            showSequence();
        }, 1000);
    }else{
        controleSequencia = 0;
        showingSequence = false;
    }
}

function handleSequence(){
    var clicked = $(this).attr("id");
    
    if(started && !showingSequence){
        botoesClicados.push(clicked);
        playSound(botoesClicados[rodadaAtual]);
        animatePress(botoesClicados[rodadaAtual]);
        
        if(botoesClicados[rodadaAtual] === arrBotoes[rodadaAtual]){ // Se for igual mantém o jogo
            if(rodadaAtual === arrBotoes.length-1){ //próxima rodada
                showingSequence = true;
                rodadaAtual = 0;
                rodada++;
                botoesClicados = [];
                addOnSequence();
                setTimeout(function(){
                    showSequence();
                }, 1000);
            }else rodadaAtual++;
        }else{
            fimDoJogo();
        }
    }
}

function fimDoJogo(){
    started = false;
    $("h1").text("Você perdeu! Aperte qualquer tecla para reiniciar");
    playSound("wrong");
    $("body").addClass("wrong");
    setTimeout(function() {
        $("body").removeClass("wrong");
    }, 500);

    arrBotoes = [];
    botoesClicados = [];
    rodada = 1;
    rodadaAtual = 0;
}

function animatePress(buttonColor){
    $("#"+buttonColor).addClass("pressed");
    setTimeout(function() {
        $("#"+buttonColor).removeClass("pressed");
    }, 100);
}

function playSound(som){
    sound.src = "./sounds/" + som + ".mp3";
    sound.load();
    sound.play();
}
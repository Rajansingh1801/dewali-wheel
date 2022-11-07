
        
let gameFinished = false;
let extractValue = false;

$(document).ready(function () {
    $("#close1").click(function () {
        $(".spin").css("display", "none");

    });
    
    $("#close3").click(function () {
        $(".spinresult").hide();
    });
    $("#close2").click(function () {
        $(".gameSection").hide();
    });
    $(".imgfirst").click(function () {
        $(".spin").css("display", "none");
        $(".gameSection, .gamesec-bg").show();
    });
    $('.gamesec-bg').click(function () {
        $('.gameSection, .gamesec-bg').hide();
       gameFinished || $('.spin').show();
    });

    // $("#spinstart").click(function () {
    //     var name = $("#name").val();
    //     $("#userName").val(name);
    //     var email = $("#email").val();
    //     $("#userEmail").val(email);
    //     var phone = $("#phone").val();
    //     $("#userPhone").val(phone);

    //     setTimeout(function () {
    //         $(".gameSection").hide();
    //         $(".spinresult").show();

    //     }, 5000);
    // });
});


const img = document.getElementById('spingame');
const btn = document.getElementById('spinstart');
let deg = 0;
let tDeg = 0;
let dDeg = 40;

const rotationValues = [
    { minDegree: 0, maxDegree: 60, value: 'No Luck Today' },
    { minDegree: 61, maxDegree: 120, value: "Free Development Project" },
    { minDegree: 121, maxDegree: 180, value: 'Custom Business Plan' },
    { minDegree: 181, maxDegree: 240, value: 'Free 3 Months Marketing' },
    { minDegree: 241, maxDegree: 300, value: 'All Servives Free' },
    { minDegree: 301, maxDegree: 360, value: 'Upto 40% off*' },
];

const freeDegRange = [[61, 120], [241, 300]];
// const degShift = 0;


const defTransform = 'translate(-50%, -50%)';

const spin = () => {
    deg += (tDeg - deg) / dDeg;
    deg = (tDeg - deg) < 1 ? tDeg : deg;
    img.style.transform = defTransform + ' rotate(' + deg + 'deg)';

    if (extractValue && tDeg === deg) {
        const optimised = 360 - ((deg - 90) % 360);

        for (const val of rotationValues) {

            if (optimised >= val.minDegree && optimised <= val.maxDegree) {
                console.log('value', val.value);
                document.getElementById("resulthere").innerText = val.value;
                let userName = $("#userName").val();
                let userEmail = $("#userEmail").val();
                let userPhone = $("#userPhone").val();
                let winText = val.value;
                console.log(val.value + userName + userEmail + userPhone);

                $(".gameSection").hide();
                $(".spinresult").show();

                $.ajax({
                    url: baseUrl + '/welcome-offer',
                    type: 'POST',
                    data: { name: userName, email: userEmail, phone: userPhone, win: winText },

                    success: function (data) {
                        console.log("success")
                    },

                });
                extractValue = false;
                gameFinished = true;
                break;
            }
        }
    }
    gameFinished || requestAnimationFrame(spin);
};

const minSpins = 10;
const maxSpins = 12;

btn.addEventListener('click', () => {
    var name = $("#name").val();
    $("#userName").val(name);
    var email = $("#email").val();
    $("#userEmail").val(email);
    var phone = $("#phone").val();
    $("#userPhone").val(phone);

    if (!name || !email || !phone) {
        return alert('All Fields are Required ');
    }

    $(".spinform").hide();
    $(".ringsection").css({"margin-left":"120px" , "transition":"1s ease-in"})

    let nextTDeg, optimised;

    do {
        nextTDeg = tDeg + Math.round((360 * (maxSpins - minSpins)) * Math.random() + 360 * minSpins);
        optimised = 360 - ((nextTDeg - 90) % 360);
    } while (freeDegRange.some(range => optimised >= range[0] && optimised <= range[1]))

    setTimeout(function() {
        tDeg = nextTDeg;
        extractValue = true;

        var audio = document.getElementById("audio");
        audio.volume = 0.07;
        audio.play();
    }, 1000);
});

spin();



const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});



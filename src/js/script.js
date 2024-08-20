// make first part inputs required
$('.form-part1 select,.form-part1 input:not([id="numberOfKids"]):not([id="wifeName"]) ').prop('required', true)

// check form validity
$.fn.isValid = function () {
    return this[0].checkValidity()
}
// check each field validity
const checkValidity = function (){
    $('input[required],select').each(function () {

        if (!$(this).isValid()) {
            $(this).siblings('.feedback').text('Please enter a ' + $(this).siblings('label').text().replace(/\*$/,' ')).fadeIn('fast').css({fontFamily:"Segoe UI" ,fontWeight: 200 })
            $(this).css("border","2px solid red",)
            $('.BOBimg').css({bottom:'43px'})
            $('.feedback').css({paddingLeft :"10px"})
        } else {
            $(this).siblings('.feedback').hide();
        }
    });
}

// to active the line above form
const showCurrentTab = function(tabNumber){
    tabs.addClass('hidden')
    $('.tab--'+tabNumber).addClass('tab--active')
    $('.form-part' + tabNumber).removeClass('hidden')
}

// for print data in accordion result page
const printData = function () {
    $('#FullName').text($('#FirstName').val() + ' ' + $('#MiddleName').val() + ' ' + $('#LastName').val())

    const info = $('input:not([id="FirstName"]):not([id="MiddleName"]):not([id="LastName"]), select');
    const infoLabels = $('.info-label:not(:eq(0)):not([id = "age-label"])')
    $('.info-content:not(:eq(0)):not([id = "age"])').each(function (i) {
        if(info[i].value)
        $(this).text(info[i].value)
        else {
            this.remove()
            infoLabels[i].remove()
        }
    })
    // to get age
    $("#age").text(new Date().getFullYear() - +$('#DOB').val().split('-')[0])
}

// for Date of Birth field
$('#DOB').on({
    'focus': function() {
        $(this).prop('type', 'date');
        $('.BOBimg').hide()
    },
    'blur': function() {
        $(this).prop('type', 'text');
        $('.BOBimg').show()
    }
});

//  for status field when we choose married display wife name and number of kids field
 let status=$('select[name="status"]');

status.on('change',function(){

    if($(this).val()== 'married'){
        $('#wn,#nok').show(1000).css({display:"flex"})
        $('#wifeName,#numberOfKids').prop('required',true)
    }else{
        $('#wn,#nok').hide(1000);
    }
})


// when write and change in fields
$('input').on({
    'keyup change':function(){
        $(this).css({ border: '2px solid #114e7c'});
        $(this).siblings('.feedback').hide();
    }
})

// when focus
$('input, select').on('focus', function () {
    $(this).css({
        border: '2px solid #007bad'
    });
}).on('blur', function () {

    $(this).css({
    border: "1px solid #059cd8",   
    });
});

// for next step button
const form = $('form')
let currentTab = 1;
const tabs = $('[class*=form-part]')
const maxTab = 3


$('#btnNext').on('click', function (e) {
    e.preventDefault();

    checkValidity();

    if (form.isValid()){
        currentTab++
        if (currentTab !== maxTab){
            $('.form-part2 select,.form-part2 input:not([name="email"]):not([name="social"]) ').prop('required', true)
            showCurrentTab(currentTab)
        }else{
            $('#btnNext').addClass('hidden');
            showCurrentTab(currentTab);
            printData();
        }
    }


})


// autocomplete 
const countries = [
    {
        name: 'Jordan',
        cities: [
            {
                name: 'Amman',
                areas: ['Dapuq', 'Khalda']
            },
            {
                name: 'Irbid',
                areas: ['Harta', 'Dogara']
            },
            {
                name: 'Aqaba',
                areas: ['Alsaba\'a', 'Althamna']
            },
            {
                name: 'Salt',
                areas: ['Salalem', 'Bohera']
            }
        ]
    },
    {
        name: 'Syria',
        cities: [
            {
                name: 'Damascus',
                areas: ['sham', 'Souq al7amidia']
            },
            {
                name: 'Aleppo',
                areas: ['Aleppo 1', 'Aleppo 2']
            },
            {
                name: 'Homs',
                areas: ['foul 1', 'Falafel 2']
            },
            {
                name: 'Latakia',
                areas: ['Latakia 1', 'Latakia 2']
            }
        ]
    },
    {
        name: 'Lebanon',
        cities: [
            {
                name: 'Beirut',
                areas: ['mar m5ael', 'jumaizeh 18']
            },
            {
                name: 'Tripoli',
                areas: ['Tripoli 1', 'Tripoli 2']
            },
            {
                name: 'Sidon',
                areas: ['Sidon 1', 'Sidon 2']
            },
            {
                name: 'Jounieh',
                areas: ['Jounieh 1', 'Jounieh 2']
            }
        ]
    },
    {
        name: 'Palestine',
        cities: [
            {
                name: 'Ramallah',
                areas: ['Ramallah 25', 'Ramallah 26']
            },
            {
                name: 'Gaza',
                areas: ['Gaza 27', 'Gaza 28']
            },
            {
                name: 'Bethlehem',
                areas: ['Bethlehem 29', 'Bethlehem 30']
            },
            {
                name: 'Hebron',
                areas: ['Hebron 31', 'Hebron 32']
            }
        ]
    }
];

$( "#DOC, #con" ).autocomplete({
    source: countries.map(c => c.name),
 });

 $('#con').on('blur', function(){
    const selectedCountry = $('#con').val();
    const selectedCities = countries
    .find(country => country.name === selectedCountry)?.cities?.map(city => city.name) || [];

    $('#city').autocomplete({
        source: selectedCities
    });
 })

 $('#city').on('blur', function(){
    const selectedAreas = countries
    .find(country => country.name === $('#con').val())
    ?.cities?.filter(c => c.name === $('#city').val())[0].areas || [];

    $('#Area').autocomplete({
        source: selectedAreas
    });
 })

//  display account link depends on social media
 $("#social").on("change",function(){

$('#acc').show(1000).css({display:"flex"});
$('#account').prop('required',true)

 })

//  for page print 
 $("input[value='Print'],.overlay,.print-data h2 button").on("click",function(){

    $('.overlay,.print-data').fadeToggle(500);
     $('body').toggleClass("modal-open");
     })
// for accordion  button open and close
$('.accordion-header').on('click', function(){
    $('.accordion-header').not($(this)).next().slideUp()
    $('.accordion-header').not($(this)).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
    $(this).next().slideToggle().css('display', 'grid')
    $(this).children('i').toggleClass('fa-angle-up fa-angle-down')
})
// for print page clone data from basic information
$('input[value="Print"]:eq(0)').one('click', function(){
    $('.accordion-body:eq(0)').children().clone().appendTo('.info')
    $('.info p').prop('class', 'another-color')
})

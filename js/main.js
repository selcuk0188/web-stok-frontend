(function ($) { // LOGIN BUTTON CLICK
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit', function (e) {
        var check = true;
        var response;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) { // inputları kontrol et
                showValidate(input[i]);
                return false;
            }
        }
        //const axios = require('axios').default;
        var kullaniciAdi = $(input[0]).val(); // kullaniciAdi
        var sifre = $(input[1]).val(); // sifre
        //var url = "http://localhost:8081/stok-yonetim/kullanici";
        var url = "http://ec2-18-156-136-177.eu-central-1.compute.amazonaws.com:8081/stok-yonetim/kullanici";
        const endPoint = url + "/login?kullaniciAdi=" + kullaniciAdi + "&sifre=" + sifre;
        e.preventDefault();
        $.when(
            axios({
                method: 'post',
                url: endPoint
            }).then(function (response) {
                kullaniciYonlendir(response.data);
            })
        )

        //return check;
    });

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    // SAYFAYI YONLENDIR
    function kullaniciYonlendir(input) {
        var basariliMi = input.basariliMi;
        if (basariliMi != true) {
            alert("Kullanıcı adı veya şifre yanlış!");
        } else {
            var kullaniciId = input.kullanici.id;
            window.location.href = 'web_page/main_page.html?kullaniciId=' + kullaniciId;
        }
    }

    // INPUTU KONTROL ET
    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).addClass('active');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).removeClass('active');
            showPass = 0;
        }

    });


})(jQuery);

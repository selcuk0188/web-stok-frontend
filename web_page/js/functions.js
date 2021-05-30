open_tag_1();
loadPageFirst(0);

function loadPageFirst(ind) {
    let navbar = document
        .getElementById("cssmenu")
        .querySelectorAll('li');
    navbar[ind].className += " active";
    for (var i = 0; i < navbar.length; i++) {
        navbar[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        });
    }
}

var userId = getParameterByName('kullaniciId');
var depoStokGlobal = [];
document.getElementById("bd-barkod-id").readOnly = true;
document.getElementById('belgeDetayKayitForm2').style.display = "none";

function girisClick() {
    if (document.getElementById('belge-tur-id') != null && document.getElementById('belge-tur-id').value == "2") {
        document.getElementById('firma-no-div-id').style.display = "none";
    } else {
        document.getElementById('firma-no-div-id').style.display = "block";
    }
}

function validateDetayEkle(data) {
    var i;
    var p_sk = document.getElementById('bd-stok-kodu-id').value;
    var g_sk = Number(p_sk.split("(")[0]);
    var p_adet = document.getElementById('bd-miktar-id').value;
    var g_adet = Number(p_adet);
    for (i = 0; i < depoStokGlobal.length; i++) {
        var dk = depoStokGlobal[i].depoKodu;
        var sk = depoStokGlobal[i].stokKodu;
        if (data.tur == 2 && data.depoKodu == dk && g_sk == sk) {
            if (depoStokGlobal[i].adet - g_adet >= 0) {
                continue;
            } else {
                alert("Stokta yeterli adet mevcut değildir!");
                return;
            }
        }
    }
    ekleBelgeDetay();
}

function setDepoStokGlobal(depoStokGlobalList) {
    depoStokGlobal = depoStokGlobalList;
}

function changeStokGrup(val) {
    if (document.getElementById('bd-stok-kodu-id') != null) {
        var stokKodu = document.getElementById('bd-stok-kodu-id').value;
        var intsk = parseInt(stokKodu);
        var barkod = "";
        var i = 0;
        for (i = 0; i < val.length; i++) {
            if (val[i].stokKodu == intsk) {
                barkod = val[i].barkod;
            }
        }
        document.getElementById('bd-barkod-id').value = barkod;
    }
}


function loadPage(rolId) {

    if (rolId == '1') {
        closeTags();
    }
    if (rolId == "2") {
        document.getElementById('firma-no-div-id').style.display = "none";
        //document.getElementById('tur-div-id').style.display = "none";
        var doc = document.getElementById("belge-tur-id");
        doc.remove();
        document.getElementById("belge-giris-p-id").innerHTML = 'Çıkış';
        closeTags();
    }
    if (rolId == "3") {
        document.getElementById('n5').innerHTML = '';
        document.getElementById('tag-5').innerHTML = '';
    }
}

function goToLoginPage() {
    window.location.href = '../index.html';
}

function setKullaniciField(kullanici) {
    var profileAdSoyad = document.getElementById("profileAdSoyad");
    profileAdSoyad.innerHTML = kullanici.adSoyad;
    var rolAdi = document.getElementById("rolName");
    var rolName;
    if (kullanici.rolId == '1')
        rolName = "Ana Depo Sorumlusu";
    else if (kullanici.rolId == '2')
        rolName = "Bölüm Sorumlusu";
    else if (kullanici.rolId == '3')
        rolName = "Admin";
    rolAdi.innerHTML = rolName;
    loadPage(kullanici.rolId);
}

function setKullaniciDepoYetkiField(depolar) {
    var yetkiliDepolar = document.getElementById("yetkiliDepolar");
    var depos = "Yetkili Depolar: [";
    for (var i = 0; i < depolar.length; i++) {
        depos += depolar[i].depoKodu + "(" + depolar[i].depoAdi + ")";
        if (i == depolar.length - 1)
            depos += "]";
        else
            depos += ",";
    }
    yetkiliDepolar.innerHTML = depos;
}


function closeTags() {
    for (var i = 1; i < 5; i++) {
        document.getElementById('n' + i).innerHTML = '';
        document.getElementById('tag-' + i).innerHTML = '';
    }
}

function open_tag_1() {
    open("tag-1");
}

function open_tag_2() {
    open("tag-2");
}

function open_tag_3() {
    open("tag-3");
}

function open_tag_4() {
    open("tag-4");
}

function open_tag_5() {
    open("tag-5");
}

function open_tag_6() {
    open("tag-6");
}

function open(param) {

    for (var i = 1; i < 7; i++) {
        var str = "tag-" + i;
        var doc = document.getElementById(str);
        if (param == str) {
            doc.style.display = "block";
        } else {
            doc.style.display = "none";
        }
    }

}

function showPass() {
    var x = document.getElementById("passId");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function isNumber(str) {
    var regExp = "/^[A-Za-z]+$/";
    return !(str.match(regExp));
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function ekle() {
    var depoKodu = addTr(document.getElementById("b-depo-kodu-id").value);
    var belgeNo = addTr(document.getElementById("b-belge-no-id").value);
    var firmaNo = addTr(document.getElementById("b-firma-no-id").value);
    var belgeTarih = addTr(document.getElementById("b-belge-tarih-id").value);
    var belgeTur = addTr(document.getElementById("belge-tur-id").value);
    var td = "<tr>" + depoKodu + belgeNo + firmaNo + belgeTarih + belgeTur + "</tr>";
    var doc = document.getElementById("belge-form-list-id");
    doc.innerHTML += td;
}

var belgeDetayArray = [];

function ekleBelgeDetay() {

    var xbelgeNo = document.getElementById("bd-belge-no-id").value;
    var xstokKodu = document.getElementById("bd-stok-kodu-id").value;
    var xbarkod = document.getElementById("bd-barkod-id").value;
    var xmiktar = document.getElementById("bd-miktar-id").value;
    var xfiyat = document.getElementById("bd-birim-fiyat-id").value;
    if (xbelgeNo == "" || xstokKodu == "" || xbarkod == "" || xmiktar == "" || xfiyat == "") {
        alert("Boş alan olamaz!");
        return;
    }
    if (!isNumber(xbarkod)) {
        alert("Alanlar sayı olmalıdır!");
        return;
    }
    document.getElementById('belgeDetayKayitForm2').style.display = "block";
    var belgeNo = addTr(xbelgeNo);
    var stokKodu = addTr(xstokKodu.split("(")[0]);
    var barkod = addTr(xbarkod);
    var miktar = addTr(xmiktar);
    var fiyat = addTr(xfiyat);
    var toplamFiyat = addTr(parseInt(xmiktar) * parseFloat(xfiyat));
    var td = "<tr>" + addTr("&nbsp;&nbsp;") + belgeNo + stokKodu + barkod + miktar + fiyat + toplamFiyat + "</tr>";
    var doc = document.getElementById("belge-detay-form-list-id");
    doc.innerHTML += td;

    var belgeDetay = {
        belgeNo: Number(xbelgeNo),
        stokKodu: xstokKodu.split("(")[0],
        barkod: xbarkod,
        adet: Number(xmiktar),
        birimTutar: parseFloat(xfiyat)
    };
    belgeDetayArray.push(belgeDetay);

}

function addTr(str) {
    return "<td>" + str + "</td>";
}


function convertHistory(hist) {
    return hist;
}

//------------------validate input functions------------------------//

function validateKullaniciInput() {
    var ad = document.getElementById("first_name").value;
    var soyad = document.getElementById("last_name").value;
    var tckn = document.getElementById("tckn").value;
    var kullaniciAdi = document.getElementById("kullanici_adi").value;
    var sifre = document.getElementById("passId").value;
    var rol = document.getElementById("rol").value;
    if (!ad.match(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/) || !soyad.match(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)) {
        alert("Ad ve Soyad özel karakter ve rakam içeremez!")
        return false;
    } else if (!tckn.match(/^[0-9]+$/)) {
        alert("TC No sadece rakamlardan oluşmalıdır! ")
        return false;
    } else if (tckn.length != 11) {
        alert("TC No 11 Haneli olmalıdır! ")
        return false;
    }
    return true;
}


//-----------------------------------------------------------------//

//var url = "http://localhost:8081/stok-yonetim";
var url = "http://ec2-18-156-136-177.eu-central-1.compute.amazonaws.com:8081/stok-yonetim";

// ---------------------------------------- KULLANICI İSLEM ---------------------------------------- //
new Vue({
    el: "#kullaniciKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("first_name").value == "" || document.getElementById("last_name").value == "" ||
                document.getElementById("tckn").value == "" || document.getElementById("kullanici_adi").value == "" ||
                document.getElementById("passId").value == "" || document.getElementById("rol").value == "") {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var ad = document.getElementById("first_name").value;
                var soyad = document.getElementById("last_name").value;
                var tckn = document.getElementById("tckn").value;
                var kullaniciAdi = document.getElementById("kullanici_adi").value;
                var sifre = document.getElementById("passId").value;
                var rol = document.getElementById("rol").value;
                if (validateKullaniciInput()) {
                    axios
                        .post(url + '/kullanici/kayit', {
                            adSoyad: ad + " " + soyad,
                            tcNo: tckn,
                            kullaniciAdi: kullaniciAdi,
                            sifre: sifre,
                            durum: 1,
                            rolId: Number(rol)
                        })
                        .then(response => {
                            if (response.data.basariliMi == true)
                                alert("Kayıt Başarıyla Kaydedilmiştir.");
                            else
                                alert("Kullanıcı Adı veya TcNo mevcuttur. Lütfen olmayan bir kayıt ekleyiniz !");
                        })
                        .catch(function (error) {
                            console.log("hata alindi");
                        })
                }
            }
            return true;
        }
    }
})


new Vue({
    el: "#kullaniciListele",
    data() {
        return {
            kullaniciList: []
        }
    },
    mounted: function () {
        this.getUser();
        axios
            .post(url + '/kullanici/listele')
            .then(response => {
                this.kullaniciList = response.data.kullaniciList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        getRolName: function (rolId) {
            if (rolId == 1) return "Ana Depo Sorumlusu";
            else if (rolId == 2) return "Bölüm Sorumlusu";
            else
                return "Admin";
        },
        kullaniciSil: function (kullaniciId) {
            axios
                .post(url + '/kullanici/sil?kullaniciId=' + kullaniciId)
                .then(response => {
                    alert("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getUser: function () {
            axios
                .post(url + '/kullanici/id?kullaniciId=' + userId)
                .then(response => {
                    this.getKullaniciDepoYetkiList(response.data.kullanici.rolId);
                    setKullaniciField(response.data.kullanici);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getKullaniciDepoYetkiList: function (rolId) {
            if (rolId == "2") {
                axios
                    .post(url + '/depo-yetki/listele/kullanici?kullaniciId=' + userId)
                    .then(response => {
                        setKullaniciDepoYetkiField(response.data.kullaniciDepoYetkiList);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
            if (rolId == "1") {
                axios
                    .post(url + '/depo/listele?durum=1')
                    .then(response => {
                        setKullaniciDepoYetkiField(response.data.depoList);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
    }
})

// ---------------------------------------- DEPO İSLEM ---------------------------------------- //
new Vue({
    el: "#depoKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("depo-adi-id").value == "" ||
                document.getElementById("depo-kodu-id").value == "" ||
                document.getElementById("depo-durum-id").value == "") {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var depoAdi = document.getElementById("depo-adi-id").value;
                var depoKodu = document.getElementById("depo-kodu-id").value;
                var depoDurum = document.getElementById("depo-durum-id").value;
                axios
                    .post(url + '/depo/kayit', {
                        depoAdi: depoAdi,
                        depoKodu: depoKodu,
                        depoDurum: parseInt(depoDurum) //aktif
                    })
                    .then(response => {
                        if (response.data.basariliMi == true)
                            alert("Kayıt Başarıyla Kaydedilmiştir.");
                        else
                            alert("Depo Kodu mevcuttur. Lütfen olmayan bir kayıt ekleyiniz !");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
                location.reload();
            }
        }
    }
})


new Vue({
    el: "#depoListele",
    data() {
        return {
            depoList: []
        }
    },
    mounted: function () {
        this.list();
    },
    methods: {
        list: function () {
            axios
                .post(url + '/depo/listele?durum=-1')
                .then(response => {
                    this.depoList = response.data.depoList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        },
        depoSil: function (depoId) {
            axios
                .post(url + '/depo/sil?depoId=' + depoId)
                .then(response => {
                    console.log("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }
})

// ---------------------------------------- KULLANICI DEPO YETKILENDIRME ---------------------------------------- //
new Vue({
    el: "#depoYetkilendirmeKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("depoyetki-kullanici-id").value == null ||
                document.getElementById("depoyetki-depokodu-id").value == null) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var kullaniciId = document.getElementById("depoyetki-kullanici-id").value;
                var depoKodu = document.getElementById("depoyetki-depokodu-id").value;
                var s_kullaniciId = parseInt(kullaniciId.split("(")[0]);
                var s_depoKodu = parseInt(depoKodu.split("(")[0]);
                axios
                    .post(url + '/depo-yetki/kayit', {
                        kullaniciId: s_kullaniciId,
                        depoKodu: s_depoKodu
                    })
                    .then(response => {
                        if (response.data.basariliMi == true)
                            alert("Kayıt Başarıyla Kaydedilmiştir.");
                        else
                            alert("Depo Kodu ve Kullanıcı Id tanımı mevcuttur. Lütfen olmayan bir kayıt ekleyiniz !");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
        }
    }
})


new Vue({
    el: "#depoYetkilendirmeListele",
    data() {
        return {
            depoYetkiList: []
        }
    },
    mounted: function () {
        axios
            .post(url + '/depo-yetki/listele')
            .then(response => {
                this.depoYetkiList = response.data.kullaniciDepoYetkiList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        depoYetkiSil: function (depoYetkiId) {
            axios
                .post(url + '/depo-yetki/sil?depoYetkiId=' + depoYetkiId)
                .then(response => {
                    console.log("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
})


new Vue({
    el: "#depoYetkiPanel",
    data() {
        return {
            userList1: [],
            depoList1: []
        }
    },
    mounted: function () {
        this.getKullaniciList();
        this.getDepoList();
    },
    methods: {
        getKullaniciList: function () {
            axios
                .post(url + '/kullanici/listele/rol?rolId=2')
                .then(response => {
                    this.userList1 = response.data.kullaniciList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        },
        getDepoList: function () {
            axios
                .post(url + '/depo/listele?durum=1')
                .then(response => {
                    this.depoList1 = response.data.depoList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }
    }
})

// ---------------------------------------- STOK KART ISLEM ---------------------------------------- //
new Vue({
    el: "#stokKartKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("stok-kodu-id").value == "" ||
                document.getElementById("stok-adi-id").value == "" ||
                document.getElementById("barkod-id").value == "" ||
                document.getElementById("grup-kodu-id").value == "" ||
                document.getElementById("stok-durum-id").value == ""
            ) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var stokKodu = document.getElementById("stok-kodu-id").value;
                var stokAdi = document.getElementById("stok-adi-id").value;
                var barkodAdi = document.getElementById("barkod-id").value;
                var grupKodu = document.getElementById("grup-kodu-id").value;
                var stokDurum = document.getElementById("stok-durum-id").value;
                var s_grupKodu = parseInt(grupKodu.split("(")[0]);
                axios
                    .post(url + '/stok-kart/kayit', {
                        stokKodu: Number(stokKodu),
                        stokAdi: stokAdi,
                        barkod: barkodAdi,
                        grupKodu: Number(s_grupKodu),
                        durum: Number(stokDurum)
                    })
                    .then(response => {
                        if (response.data.basariliMi == true)
                            alert("Kayıt Başarıyla Kaydedilmiştir.");
                        else
                            alert("Stok Kodu mevcuttur. Lütfen olmayan bir kayıt ekleyiniz !");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
                location.reload();
            }
        }
    }
})


new Vue({
    el: "#stokKartListele",
    data() {
        return {
            stokKartList: []
        }
    },
    mounted: function () {
        axios
            .post(url + '/stok-kart/listele?durum=-1')
            .then(response => {
                this.stokKartList = response.data.stokKartList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        stokKartSil: function (stokKartId) {
            axios
                .post(url + '/stok-kart/sil?stokKartId=' + stokKartId)
                .then(response => {
                    console.log("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        convertHistory: function (hist) {
            convertHistory(hist);
        }

    }
})

new Vue({
    el: "#stokKartPanel2",
    data() {
        return {
            stokGrupList1: []
        }
    },
    mounted: function () {
        this.getStokGrupList();
    },
    methods: {
        getStokGrupList: function () {
            axios
                .post(url + '/stok-kart/grup/listele')
                .then(response => {
                    this.stokGrupList1 = response.data.stokGrupList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }
    }
})

// ---------------------------------------- DEPO GİRİŞ/ÇIKIŞ ISLEM ---------------------------------------- //

new Vue({
    el: "#belgeKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("b-depo-kodu-id").value == "" ||
                document.getElementById("b-belge-no-id").value == "" ||
                document.getElementById("b-belge-tarih-id").value == ""
            ) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var depoKodu = document.getElementById("b-depo-kodu-id").value;
                var belgeNo = document.getElementById("b-belge-no-id").value;
                var firmaNo = document.getElementById("b-firma-no-id").value;
                var s_firmaNo = null;
                if (document.getElementById("b-firma-no-id") != null)
                    s_firmaNo = parseInt(firmaNo.split("(")[0]);
                var belgeTarih = document.getElementById("b-belge-tarih-id").value;
                var belgeTur;
                if (document.getElementById("belge-tur-id") == null)
                    belgeTur = "2";
                else
                    belgeTur = document.getElementById("belge-tur-id").value;
                var s_depoKodu = parseInt(depoKodu.split("(")[0]);
                axios
                    .post(url + '/belge/kayit', {
                        depoKodu: s_depoKodu,
                        belgeNo: belgeNo,
                        firmaNo: s_firmaNo,
                        belgeTarihi: belgeTarih,
                        tur: Number(belgeTur)
                    })
                    .then(response => {
                        if (response.data.basariliMi == true)
                            alert("Kayıt Başarıyla Kaydedilmiştir.");
                        else
                            alert("Belge No mevcuttur. Lütfen olmayan bir kayıt ekleyiniz !");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
            location.reload();
        }
    }
})


new Vue({
    el: "#belgeListele",
    data() {
        return {
            belgeList: []
        }
    },
    mounted: function () {
        this.getBelgeList();
    },
    methods: {
        getBelgeList: function () {
            axios
                .post(url + '/belge/listele?kullaniciId=' + userId)
                .then(response => {
                    this.belgeList = response.data.belgeList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }

    }
})

var rolID = 0;

function setRolId(p_rolID) {
    rolID = p_rolID.rolId;
}

new Vue({
    el: "#belgeKayitForm1",
    data() {
        return {
            depoList2: []
        }
    },
    mounted: function () {
        this.getDepoList();
    },
    methods: {
        getDepoList: function () {
            axios
                .post(url + '/kullanici/id?kullaniciId=' + userId)
                .then(response => {
                    setRolId(response.data.kullanici);
                    this.getDepoList2();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getDepoList2: function () {
            if (rolID == 2) {
                axios
                    .post(url + '/depo-yetki/listele/kullanici?kullaniciId=' + userId)
                    .then(response => {
                        this.depoList2 = response.data.kullaniciDepoYetkiList;
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            } else {
                axios
                    .post(url + '/depo/listele?durum=1')
                    .then(response => {
                        this.depoList2 = response.data.depoList;
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
        }
    }
})
new Vue({
    el: "#belgeKayitForm2",
    data() {
        return {
            firmaList: []
        }
    },
    mounted: function () {
        this.getFirmaList();
    },
    methods: {
        getFirmaList: function () {
            axios
                .post(url + '/firma/listele')
                .then(response => {
                    this.firmaList = response.data.firmaList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }
    }
})

// ---------------------------------------- DEPO DETAY GİRİŞ/ÇIKIŞ ISLEM ---------------------------------------- //

new Vue({
    el: "#belgeDetayKayitForm2",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (false) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                axios
                    .post(url + '/belge-detay/kayit', {
                        belgeDetayList: belgeDetayArray
                    })
                    .then(response => {
                        alert("Kayıt Başarıyla Kaydedilmiştir.");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
                location.reload();
            }
        }
    }
})

new Vue({
    el: "#belgeDetayKayitForm",
    mounted: function () {
    },
    methods: {
        addData: function () {
            if (document.getElementById("bd-belge-no-id") != null) {
                var belgeNo = document.getElementById("bd-belge-no-id").value;
                axios
                    .post(url + '/belge/listele/belge-no?belgeNo=' + belgeNo)
                    .then(response => {
                        validateDetayEkle(response.data.belge);
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
        }
    }
})


new Vue({
    el: "#belgeDetayListele",
    data() {
        return {
            belgeDetayList: []
        }
    },
    mounted: function () {
        axios
            .post(url + '/belge-detay/listele?kullaniciId=' + userId)
            .then(response => {
                this.belgeDetayList = response.data.belgeDetayList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        belgeDetaySil: function (belgeDetayId) {
            axios
                .post(url + '/belge-detay/sil?belgeId=' + belgeDetayId)
                .then(response => {
                    console.log("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
})

new Vue({
    el: "#belgeDetayForm",
    data() {
        return {
            stokList1: [],
            belgeList1: []
        }
    },
    mounted: function () {
        this.getStokList();
        this.getBelgeList();
    },
    methods: {
        getStokList: function () {
            axios
                .post(url + '/stok-kart/listele?durum=1')
                .then(response => {
                    this.stokList1 = response.data.stokKartList;
                    changeStokGrup(response.data.stokKartList);
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        },
        getBelgeList: function () {
            axios
                .post(url + '/belge/listele?kullaniciId=' + userId)
                .then(response => {
                    this.belgeList1 = response.data.belgeList;
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }
    }
})


new Vue({
    el: "#depoStokListesi",
    data() {
        return {
            depoStokList: []
        }
    },
    mounted: function () {
        this.getDepoStokList();
    },
    methods: {
        getDepoStokList: function () {
            axios
                .post(url + '/depo/listele/stok/kullanici?kullaniciId=' + userId)
                .then(response => {
                    this.depoStokList = response.data.depoStokDtoList;
                    setDepoStokGlobal(response.data.depoStokDtoList);
                })
                .catch(function (error) {
                    console.log("hata alindi");
                })
        }
    }
})

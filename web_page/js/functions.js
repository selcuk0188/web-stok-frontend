open('tag-1');
let navbar = document
    .getElementById("cssmenu")
    .querySelectorAll('li');
navbar[0].className += " active";

for (var i = 0; i < navbar.length; i++) {
    navbar[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    });
}

//var kullaniciId = getParameterByName('kullaniciId');
var rolId = getParameterByName('rolId');

if (rolId == '1') {
    document.getElementById('n5').innerHTML = '';
    document.getElementById('tag-5').innerHTML = '';
}
if (rolId == "2") {
    closeTags();
}
if (rolId == "3") {
    closeTags();
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

function open(param) {

    for (var i = 1; i < 6; i++) {
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

var belgeDetayArray=[];

function ekleBelgeDetay() {
    var xbelgeNo = document.getElementById("bd-belge-no-id").value;
    var xstokKodu = document.getElementById("bd-stok-kodu-id").value;
    var xbarkod = document.getElementById("bd-barkod-id").value;
    var xmiktar = document.getElementById("bd-miktar-id").value;
    var xfiyat = document.getElementById("bd-birim-fiyat-id").value;
    var belgeNo = addTr(xbelgeNo.split("(")[0]);
    var stokKodu = addTr(xstokKodu.split("(")[0]);
    var barkod = addTr(xbarkod);
    var miktar = addTr(xmiktar);
    var fiyat = addTr(xfiyat);
    var td = "<tr>" + belgeNo + stokKodu + barkod + miktar + fiyat + "</tr>";
    var doc = document.getElementById("belge-detay-form-list-id");
    doc.innerHTML += td;

    var belgeDetay = {
        belgeNo: Number(xbelgeNo.split("(")[0]),
        stokKodu: Number(xstokKodu.split("(")[0]),
        barkod: xbarkod,
        adet: Number(xmiktar),
        birimTutar: parseFloat(xfiyat)
    };
    belgeDetayArray.push(belgeDetay);

}

function addTr(str) {
    return "<td>" + str + "</td>";
}

var url = "http://localhost:8081/stok-yonetim";

// ---------------------------------------- KULLANICI İSLEM ---------------------------------------- //
new Vue({
    el: "#kullaniciKayitForm",
    mounted: function () {
    },
    methods: {
        save: function () {
            if (document.getElementById("first_name").value == null || document.getElementById("last_name").value == null ||
                document.getElementById("tckn").value == null || document.getElementById("kullanici_adi").value == null ||
                document.getElementById("passId").value == null || document.getElementById("rol").value == null) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var ad = document.getElementById("first_name").value;
                var soyad = document.getElementById("last_name").value;
                var tckn = document.getElementById("tckn").value;
                var kullaniciAdi = document.getElementById("kullanici_adi").value;
                var sifre = document.getElementById("passId").value;
                var rol = document.getElementById("rol").value;
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
                        alert("Kullanıcı Başarıyla Kydedilmiştir.");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
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
                    console.log("Silme İşlemi Başarılı");
                })
                .catch(function (error) {
                    console.log(error);
                })
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
            if (document.getElementById("depo-adi-id").value == null ||
                document.getElementById("depo-kodu-id").value == null ||
                document.getElementById("depo-durum-id").value == null) {
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
                        alert("Kullanıcı Başarıyla Kydedilmiştir.");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
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
        axios
            .post(url + '/depo/listele?durum=-1')
            .then(response => {
                this.depoList = response.data.depoList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
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
                        alert("Kullanıcı Başarıyla Kydedilmiştir.");
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
                .post(url + '/kullanici/listele')
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
            if (document.getElementById("stok-kodu-id").value == null ||
                document.getElementById("stok-adi-id").value == null ||
                document.getElementById("barkod-id").value == null ||
                document.getElementById("grup-kodu-id").value == null ||
                document.getElementById("stok-durum-id").value == null
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
                        stokKodu: stokKodu,
                        stokAdi: stokAdi,
                        barkod: barkodAdi,
                        grupKodu: Number(s_grupKodu),
                        durum: Number(stokDurum)
                    })
                    .then(response => {
                        alert("Kullanıcı Başarıyla Kaydedilmiştir.");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
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
            if (document.getElementById("b-depo-kodu-id").value == null ||
                document.getElementById("b-belge-no-id").value == null ||
                document.getElementById("b-firma-no-id").value == null ||
                document.getElementById("b-belge-tarih-id").value == null ||
                document.getElementById("belge-tur-id").value == null
            ) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                var depoKodu = document.getElementById("b-depo-kodu-id").value;
                var belgeNo = document.getElementById("b-belge-no-id").value;
                var firmaNo = document.getElementById("b-firma-no-id").value;
                var belgeTarih = document.getElementById("b-belge-tarih-id").value;
                var belgeTur = document.getElementById("belge-tur-id").value;
                var s_depoKodu = parseInt(depoKodu.split("(")[0]);
                axios
                    .post(url + '/belge/kayit', {
                        depoKodu: s_depoKodu,
                        belgeNo: belgeNo,
                        firmaNo: firmaNo,
                        belgeTarihi: belgeTarih,
                        tur: Number(belgeTur)
                    })
                    .then(response => {
                        alert("Kullanıcı Başarıyla Kaydedilmiştir.");
                    })
                    .catch(function (error) {
                        console.log("hata alindi");
                    })
            }
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
        axios
            .post(url + '/belge/listele')
            .then(response => {
                this.belgeList = response.data.belgeList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        stokKartSil: function (belgeId) {
            axios
                .post(url + '/belge/sil?belgeId=' + belgeId)
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
                .post(url + '/depo/listele?durum=1')
            .then(response => {
                this.depoList2 = response.data.depoList;
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
            if (document.getElementById("b-depo-kodu-id").value == null ||
                document.getElementById("b-belge-no-id").value == null ||
                document.getElementById("b-firma-no-id").value == null ||
                document.getElementById("b-belge-tarih-id").value == null ||
                document.getElementById("belge-tur-id").value == null
            ) {
                alert("Herhangi bir alan Boş olamaz!!!");
            } else {
                axios
                    .post(url + '/belge-detay/kayit', {
                        belgeDetayList: belgeDetayArray
                    })
                    .then(response => {
                        alert("Kullanıcı Başarıyla Kaydedilmiştir.");
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
            belgeList: []
        }
    },
    mounted: function () {
        axios
            .post(url + '/belge-detay/listele')
            .then(response => {
                this.belgeList = response.data.belgeList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
    },
    methods: {
        stokKartSil: function (belgeId) {
            axios
                .post(url + '/belge-detay/sil?belgeId=' + belgeId)
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
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
        },
        getBelgeList: function () {
            axios
                .post(url + '/belge/listele')
            .then(response => {
                this.belgeList1 = response.data.belgeList;
            })
            .catch(function (error) {
                console.log("hata alindi");
            })
        }
    }
})

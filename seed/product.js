var mongoose = require('mongoose');
var productModel = require('../models/product');
mongoose.connect('mongodb://localhost/cattuongShopping');
var data = [
    {
    imagePath: '/assets/img/product/samsung-galaxy-s8-plus1-1-300x300.jpg',
    title: "Samsung Galaxy S8 Plus",
    price: 20490000,
    description: '  <div class="panel panel-default">'+

                            '<li class = "list-group-item">Màn hình: 6.2 inch, Quad HD 2K</li>' +
                            '<li class = "list-group-item">HĐH: Android 7.0</li>' +
                            '<li class = "list-group-item">CPU: Exynos 8895 8 nhân</li>' +
                            '<li class = "list-group-item">RAM: 4 GB, ROM: 64 GB</li>' +
                            '<li class = "list-group-item">Camera: 12 MP, Selfie: 8 MP</li>' +
                            '<li class = "list-group-item">PIN: 3500 mAh</span>' +

                    '</div>'
   
    },
    {
    imagePath: '/assets/img/product/samsung-galaxy-s8-4-300x300.jpg',
    title: "Samsung Galaxy S8s",
    price: 18000000,
        description: '  <div class="panel panel-default">'+

                            '<li class = "list-group-item">Màn hình: 6.2 inch, Quad HD 2K</li>' +
                            '<li class = "list-group-item">HĐH: Android 7.0</li>' +
                            '<li class = "list-group-item">CPU: Exynos 8895 8 nhân</li>' +
                            '<li class = "list-group-item">RAM: 4 GB, ROM: 64 GB</li>' +
                            '<li class = "list-group-item">Camera: 12 MP, Selfie: 8 MP</li>' +
                            '<li class = "list-group-item">PIN: 3500 mAh</span>' +

                    '</div>'
   
    },
   {
    imagePath: '/assets/img/product/samsung-galaxy-s7-edge-26-300x300.jpg',
    title: "Samsung Galaxy S7 edge",
    price: 14000000,
       description: '  <div class="panel panel-default">'+

                            '<li class = "list-group-item">Màn hình: 6.2 inch, Quad HD 2K</li>' +
                            '<li class = "list-group-item">HĐH: Android 7.0</li>' +
                            '<li class = "list-group-item">CPU: Exynos 8895 8 nhân</li>' +
                            '<li class = "list-group-item">RAM: 4 GB, ROM: 64 GB</li>' +
                            '<li class = "list-group-item">Camera: 12 MP, Selfie: 8 MP</li>' +
                            '<li class = "list-group-item">PIN: 3500 mAh</span>' +

                    '</div>'
   
    },
    {
    imagePath: '/assets/img/product/samsung-galaxy-a7-2017-11-300x300.jpg',
    title: "Samsung Galaxy A7",
    price: 12000000,
       description: '  <div class="panel panel-default">'+

                            '<li class = "list-group-item">Màn hình: 5.5 inch, Quad HD 2K</li>' +
                            '<li class = "list-group-item">HĐH: Android 7.0</li>' +
                            '<li class = "list-group-item">CPU: Exynos 8895 8 nhân</li>' +
                            '<li class = "list-group-item">RAM: 4 GB, ROM: 64 GB</li>' +
                            '<li class = "list-group-item">Camera: 12 MP, Selfie: 8 MP</li>' +
                            '<li class = "list-group-item">PIN: 3500 mAh</span>' +

                    '</div>'
   
    },
    {
    imagePath: '/assets/img/product/samsung-galaxy-a5-2016-5-300x300.jpg',
    title: "Samsung Galaxy A5",
    price: 10000000,
       description: '  <div class="panel panel-default">'+

                            '<li class = "list-group-item">Màn hình: 5 inch, Quad HD 2K</li>' +
                            '<li class = "list-group-item">HĐH: Android 7.0</li>' +
                            '<li class = "list-group-item">CPU: Exynos 8895 8 nhân</li>' +
                            '<li class = "list-group-item">RAM: 4 GB, ROM: 64 GB</li>' +
                            '<li class = "list-group-item">Camera: 12 MP, Selfie: 8 MP</li>' +
                            '<li class = "list-group-item">PIN: 3500 mAh</span>' +

                    '</div>'
   
    }
    ];
    cleanData(createNewData);
    
    function cleanData(next) {
        productModel.remove({}, function(err){
            if(err) {
                console.log(err);
            }
            else {
                next();
            }
        });
    }
    
    function createNewData (){
        var count = 0;
        for(var i = 0; i < data.length; i ++)
        {
            var product = new productModel({
                imagePath: data[i].imagePath,
                description: data[i].description,
                price: data[i].price,
                title: data[i].title
            });
            product.save(function(err, itemSaved){
                if(err){
                    console.log(err);
                }
                else {
                    count ++;
                    if(count == data.length) {
                        mongoose.disconnect();
                    }
                }
            });
        }
    }
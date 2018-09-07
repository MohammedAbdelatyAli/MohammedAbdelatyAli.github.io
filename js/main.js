$(function () {
    'use strict';

    /* Step 1 Section */
    // Show Time Frime
    $(".add-time-frime").click(function () {
        if ($(".create-new-time-frime").show() == false) {
            $(".create-new-time-frime").show()
        }
    });

    // Hide Time Frime
    $(".cancel-time-frime").click(function () {
        if ($(".create-new-time-frime").hide() == false) {
            $(".create-new-time-frime").hide()
        }
    });

    // Add New Time Frime
    $(".save").click(function () {
        var dropdown = $(".schedule-dl");
        var selectedText = dropdown.find("option:selected").text();
        var fromDate = $('input:text[name=between]').val();
        var toDate = $('input:text[name=and]').val();
        if ($.trim(fromDate).length > 0 && $.trim(toDate).length > 0) {
            var newTimeFrime = selectedText + " from " + fromDate + " to " + toDate;
            $('.time-frime-dl').append($('<option>', {
                value: newTimeFrime,
                text: newTimeFrime
            }));
        }
    });

    // Compaign Start & End Times
    $('.datepicker').datepicker()
    //$('#form-section .start').css("margin-bottom", "200px");
    //$('#form-section .start').css("margin-bottom", "0");

    /* Step 2 Section */
    // Hide Step 1 and Show Step 2
    $(".next").click(function () {
        $("#step1-form").submit(function (e) {
            e.preventDefault();
            $("#form-section").hide();
            $('#progress-bar-step1-img').hide();
            $('#design-section').show();
            $('#progress-bar-step2-img').show();
            $('#page-wrapper').css("background-color", "#f2f5f8");
        });
    });

    // Hide Step 2 and Show Step 1
    $("#back").click(function () {
        $('#design-section').hide();
        $('#progress-bar-step2-img').hide();
        $("#form-section").show();
        $('#progress-bar-step1-img').show();
        $('#page-wrapper').css("background-color", "#ebf0f6");
    });

    // Start New Design
    // Show New Design Section and Hide Upload Design Section
    $('.new-design').click(function () {
        $('.upload-design').removeClass('focus');
        $(this).addClass('focus');
        $('#design-image').hide();
        $('#new-design-section').show();
        var iphone_header_content = $('#iphone-header, #iphone-content');
        $(iphone_header_content).show();
        if ($('#buttons-btn').data("clicked") == true) {
            $('#iphone-buttons-container').show();
        }
        if ($('#Product-type-1').data("clicked") == true) {
            $('#iphone-product-1-container').show();
            $('#iphone-product-2-container').hide();
            $('#iphone-product-3-container').hide();
        }
        if ($('#Product-type-2').data("clicked") == true) {
            $('#iphone-product-1-container').hide();
            $('#iphone-product-2-container').show();
            $('#iphone-product-3-container').hide();
        }
        if ($('#Product-type-3').data("clicked") == true) {
            $('#iphone-product-1-container').hide();
            $('#iphone-product-2-container').hide();
            $('#iphone-product-3-container').show();
        }
    });
    // End New Design

    // Start Upload Design
    // Show Upload Design Section and Hide New Design Section
    $('.upload-design').click(function () {
        $('.new-design').removeClass('focus');
        $(this).addClass('focus');
        $('#new-design-section').hide();
        $('#design-image').show();
        var all_iphone_design = $('#iphone-header, #iphone-content, #iphone-product-1-container, #iphone-product-2-container, #iphone-product-3-container, #iphone-buttons-container');
        $(all_iphone_design).hide();
        $('#design-imgUpload').on('change', function () {
            var imgItem = $(this)[0].files;
            var imgCount = $(this)[0].files.length;
            var imgPath = $(this)[0].value;
            var imgExt = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
            if (imgExt == 'gif' || imgExt == 'png' || imgExt == 'jpg' || imgExt == 'jpeg' || imgExt == 'bmp') {
                if (typeof (FileReader) != "undefined") {
                    for (var i = 0; i < imgCount; i++) {
                        var reader = new FileReader();
                        var fn = imgItem[i].name;
                        var fs = imgItem[i].size;
                        var ft = imgItem[i].type;
                        reader.onload = function (e) {
                            var background_imagePreview = $('#iphone-design-container');
                            $(background_imagePreview).css('background', 'url(' + e.target.result + ')');
                        }
                        reader.readAsDataURL($(this)[0].files[i]);
                    }
                }
                else {
                    imagePreview.html("This Browser doesn't Support FileReader");
                }
            }
            else {
                imagePreview.html("Invalid File Format");
            }
        });
    });
    // End Upload Design

    /* Start Background button */
    // On click Background button
    $('#background-btn').click(function () {
        $('#background-angle-down').hide();
        $('#background-angle-up').show();
        $(this).css("background-color", "#347ce3");
        $(this).css("color", "#fff");
        // Change Style of other Buttons
        var otherAngleDown = $('#header-angle-down, #product-angle-down, #buttons-angle-down, #content-angle-down');
        var otherAngleUp = $('#header-angle-up, #product-angle-up, #buttons-angle-up, #content-angle-up');
        $(otherAngleDown).show();
        $(otherAngleUp).hide();
        var otherButtons = $('#header-btn, #product-btn, #buttons-btn, #content-btn');
        $(otherButtons).css("background-color", "#fff");
        $(otherButtons).css("color", "#000");
        // Hide Backgrount Section 
        var otherSections = $('#header-section, #product-section, #buttons-section, #content-section');
        $(otherSections).hide();
        // Show Backgrount Section 
        $('#background-section').show();
        // Background Color Section Function
        var background_color = function () {
            $('#background-gradient').hide();
            $('#background-image').hide();
            $('#background-color-picker').show();
            var colorInput = $('input[type=color][id=background-color-picker-interface]')
            var selectedColor = $(colorInput).val();
            $(iphoneContainer).css("background", selectedColor);
            $(colorInput).change(function () {
                selectedColor = $(this).val();
                $(iphoneContainer).css("background", selectedColor);
            });
        };
        // Show parts of Backgrount Sections
        var id = $('input[type=radio][name=optradio]:checked').attr('id');
        var iphoneContainer = $('#iphone-design-container');
        $('input[type=radio][name=optradio]').change(function () {
            id = $('input[type=radio][name=optradio]:checked').attr('id');
            // Background Color Section
            if (id == "color") {
                background_color();
            };
            // Background Gradient Section
            if (id == "gradient") {
                $('#gradient').data('clicked', true);
                $('#background-image').hide();
                $('#background-color-picker').hide();
                $('#background-gradient').show();
                var selectedColorLeft = $('input[type=color][id=background-gradient-left]').val();
                var selectedColorRight = $('input[type=color][id=background-gradient-right]').val();
                $(iphoneContainer).css({ background: 'linear-gradient(to right,' + selectedColorLeft + ', ' + selectedColorRight + ')' });
                $('input[type=color][id=background-gradient-left]').change(function () {
                    selectedColorLeft = $(this).val();
                    $(iphoneContainer).css({ background: 'linear-gradient(to right,' + selectedColorLeft + ', ' + selectedColorRight + ')' });
                })
                $('input[type=color][id=background-gradient-right]').change(function () {
                    selectedColorRight = $(this).val();
                    $(iphoneContainer).css({ background: 'linear-gradient(to right,' + selectedColorLeft + ', ' + selectedColorRight + ')' });
                })
            }
            // Background Image Section
            if (id == "image") {
                $('#image').data('clicked', true);
                $('#background-gradient').hide();
                $('#background-color-picker').hide();
                $('#background-image').show();
                $('#imgUpload').on('change', function () {
                    var imgItem = $(this)[0].files;
                    var imgCount = $(this)[0].files.length;
                    var imgPath = $(this)[0].value;
                    var imgExt = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
                    var imagePreview = $('#imagePreview');
                    imagePreview.empty();
                    if (imgExt == 'gif' || imgExt == 'png' || imgExt == 'jpg' || imgExt == 'jpeg' || imgExt == 'bmp') {
                        if (typeof (FileReader) != "undefined") {
                            for (var i = 0; i < imgCount; i++) {
                                var reader = new FileReader();
                                var fn = imgItem[i].name;
                                var fs = imgItem[i].size;
                                var ft = imgItem[i].type;
                                reader.onload = function (e) {
                                    var background_imagePreview = $('#iphone-design-container');
                                    $(background_imagePreview).css('background', 'url(' + e.target.result + ')');
                                    $("<img />", {
                                        "src": e.target.result,
                                        "width": "61px",
                                        "height": "44px",
                                        "title": fn + " and size " + fs + " bytes and type " + ft,
                                        "alt": fn + " and size " + fs + " bytes and type " + ft
                                    }).css({ "margin-left": "7px", "margin-top": "5px" }).appendTo(imagePreview);
                                }
                                imagePreview.show();
                                reader.readAsDataURL($(this)[0].files[i]);
                            }
                        }
                        else {
                            imagePreview.html("This Browser doesn't Support FileReader");
                        }
                    }
                    else {
                        imagePreview.html("Invalid File Format");
                    }
                });
            }
        });
    });
    /* End Baground button */

    /* Start Header button */
    // On click Header button
    $('#header-btn').click(function () {
        $('#header-angle-down').hide();
        $('#header-angle-up').show();
        $(this).css("background-color", "#347ce3");
        $(this).css("color", "#fff");
        // Change Style of other Buttons
        var otherAngleDown = $('#background-angle-down, #product-angle-down, #buttons-angle-down, #content-angle-down');
        var otherAngleUp = $('#background-angle-up, #product-angle-up, #buttons-angle-up, #content-angle-up');
        $(otherAngleDown).show();
        $(otherAngleUp).hide();
        var otherButtons = $('#background-btn, #product-btn, #buttons-btn, #content-btn');
        $(otherButtons).css("background-color", "#fff");
        $(otherButtons).css("color", "#000");
        // Hide Header Section 
        var otherSections = $('#background-section, #product-section, #buttons-section, #content-section');
        $(otherSections).hide();
        // Show Header Section 
        $('#header-section').show();
        // iPhone Header Section 
        var iPhone_header_section = $('#iphone-header');
        // Show parts of Header Sections
        /* Header Type */
        $('input[type=radio][name=optradio]').change(function () {
            var id = $('input[type=radio][name=optradio]:checked').attr('id');
            // Round Shape
            if (id == "round_shape") {
                $(iPhone_header_section).css("visibility", "visible");
                $(iPhone_header_section).css("border-bottom-right-radius", "50%");
                $(iPhone_header_section).css("border-bottom-left-radius", "50%");
                $('#round_shape').attr('checked', true);
            }
            // Rectangular Shape
            if (id == "rectangular_shape") {
                $(iPhone_header_section).css("visibility", "visible");
                $(iPhone_header_section).css("border-bottom-right-radius", "0");
                $(iPhone_header_section).css("border-bottom-left-radius", "0");
                $('#rectangular_shape').attr('checked', true);
            };
        });
        /* Header Color */
        var colorInput = $('input[type=color][id=header-color-picker-interface]')
        var selectedColor = $(colorInput).val();
        $(iPhone_header_section).css("background", selectedColor);
        $(colorInput).change(function () {
            selectedColor = $(this).val();
            $(iPhone_header_section).css("background", selectedColor);
        });
        /* Header Text */
        var textInput = $('input[type=text][id=header-text-input]')
        var textInputValue = $(textInput).val();
        $(iPhone_header_section).text(textInputValue);
        $(textInput).change(function () {
            textInputValue = $(this).val();
            $(iPhone_header_section).text(textInputValue);
        });
        /* Header Text Color */
        var colorInput = $('input[type=color][id=header-text-color-picker-interface]')
        var selectedColor = $(colorInput).val();
        $(iPhone_header_section).css("color", selectedColor);
        $(colorInput).change(function () {
            selectedColor = $(this).val();
            $(iPhone_header_section).css("color", selectedColor);
        });
        /* Header Text Type */
        var textType_dl = $("#header-text-type-dl");
        $(textType_dl).change(function () {
            var selected_textType = $(textType_dl).val();
            if (selected_textType == "Ubuntu") {
                $(iPhone_header_section).css("font-family", selected_textType);
            };
            if (selected_textType == "sans-serif") {
                $(iPhone_header_section).css("font-family", selected_textType);
            };
        });
    });
    /* End Header button */

    /* Start Content button */
    // On click Content button
    $('#content-btn').click(function () {
        $('#content-angle-down').hide();
        $('#content-angle-up').show();
        $(this).css("background-color", "#347ce3");
        $(this).css("color", "#fff");
        // Change Style of other Buttons
        var otherAngleDown = $('#header-angle-down, #product-angle-down, #buttons-angle-down, #background-angle-down');
        var otherAngleUp = $('#header-angle-up, #product-angle-up, #buttons-angle-up, #background-angle-up');
        $(otherAngleDown).show();
        $(otherAngleUp).hide();
        var otherButtons = $('#header-btn, #product-btn, #buttons-btn, #background-btn');
        $(otherButtons).css("background-color", "#fff");
        $(otherButtons).css("color", "#000");
        // Hide Content Section 
        var otherSections = $('#background-section, #header-section, #product-section, #buttons-section');
        $(otherSections).hide();
        // Show Content Section 
        $('#content-section').show();
        // Show iPhone Content Section 
        var iPhone_content_section = $('#iphone-content');
        $(iPhone_content_section).css("visibility", "visible");
        // Show parts of Content Sections
        var content_section_1 = $('#content-section-btn-1');
        var content_section_2 = $('#content-section-btn-2');
        var iPhone_content_btn1 = $('#content-btn-1');
        var iPhone_content_btn2 = $('#content-btn-2');
        var iPhone_content_text_input1 = $('#content-text-input-1');
        var iPhone_content_text_input2 = $('#content-text-input-2');
        var iPhone_content_color1 = $('#content-text-color-picker-interface-1');
        var iPhone_content_color2 = $('#content-text-color-picker-interface-2');
        var iPhone_content_text_type_dl1 = $('#content-text-type-dl-1');
        var iPhone_content_text_type_dl2 = $('#content-text-type-dl-2');
        var iPhone_content_element_1 = $('#iphone-content-1');
        var iPhone_content_element_2 = $('#iphone-content-2');
        // Content Button 1 section
        var content_btn1_fn = function () {
            $(iPhone_content_btn2).removeClass('focus');
            $(iPhone_content_btn1).addClass('focus');
            $(content_section_2).hide();
            $(content_section_1).show();
            /* Content Text */
            var textInputValue = $(iPhone_content_text_input1).val();
            $(iPhone_content_element_1).text(textInputValue);
            $(iPhone_content_text_input1).change(function () {
                textInputValue = $(this).val();
                $(iPhone_content_element_1).text(textInputValue);
            });
            /* Content Text Color */
            var selectedColor = $(iPhone_content_color1).val();
            $(iPhone_content_element_1).css("color", selectedColor);
            $(iPhone_content_color1).change(function () {
                selectedColor = $(this).val();
                $(iPhone_content_element_1).css("color", selectedColor);
            });
            /* Content Text Type */
            $(iPhone_content_text_type_dl1).change(function () {
                var selected_textType = $(iPhone_content_text_type_dl1).val();
                if (selected_textType == "Ubuntu") {
                    $(iPhone_content_element_1).css("font-family", selected_textType);
                };
                if (selected_textType == "sans-serif") {
                    $(iPhone_content_element_1).css("font-family", selected_textType);
                };
            });
        }
        if ($(iPhone_content_btn2).data('clicked') != true) {
            content_btn1_fn();
        }
        $(iPhone_content_btn1).click(function () {
            content_btn1_fn();
        });
        // Content Button 2 section
        $(iPhone_content_btn2).click(function () {
            $(this).data('clicked', true);
            $(iPhone_content_btn1).removeClass('focus');
            $(this).addClass('focus');
            $(content_section_1).hide();
            $(content_section_2).show();
            /* Content Text */
            var textInputValue = $(iPhone_content_text_input2).val();
            $(iPhone_content_element_2).text(textInputValue);
            $(iPhone_content_text_input2).change(function () {
                textInputValue = $(this).val();
                $(iPhone_content_element_2).text(textInputValue);
            });
            /* Content Text Color */
            var selectedColor = $(iPhone_content_color2).val();
            $(iPhone_content_element_2).css("color", selectedColor);
            $(iPhone_content_color2).change(function () {
                selectedColor = $(this).val();
                $(iPhone_content_element_2).css("color", selectedColor);
            });
            /* Content Text Type */
            $(iPhone_content_text_type_dl2).change(function () {
                var selected_textType = $(iPhone_content_text_type_dl2).val();
                if (selected_textType == "Ubuntu") {
                    $(iPhone_content_element_2).css("font-family", selected_textType);
                };
                if (selected_textType == "sans-serif") {
                    $(iPhone_content_element_2).css("font-family", selected_textType);
                };
            });
        });
    });
    /* End Content button */

    /* Start Product button */
    // On click Product button
    $('#product-btn').click(function () {
        $('#product-angle-down').hide();
        $('#product-angle-up').show();
        $(this).css("background-color", "#347ce3");
        $(this).css("color", "#fff");
        // Change Style of other Buttons
        var otherAngleDown = $('#header-angle-down, #background-angle-down, #buttons-angle-down, #content-angle-down');
        var otherAngleUp = $('#header-angle-up, #background-angle-up, #buttons-angle-up, #content-angle-up');
        $(otherAngleDown).show();
        $(otherAngleUp).hide();
        var otherButtons = $('#header-btn, #background-btn, #buttons-btn, #content-btn');
        $(otherButtons).css("background-color", "#fff");
        $(otherButtons).css("color", "#000");
        // Hide Product Section 
        var otherSections = $('#background-section, #header-section, #buttons-section, #content-section');
        $(otherSections).hide();
        // Show Product Section 
        $('#product-section').show();
        var product_1_container = $('#iphone-product-1-container');
        var product_2_container = $('#iphone-product-2-container');
        var product_3_container = $('#iphone-product-3-container');
        var Product_type_1 = $('#Product-type-1');
        var Product_type_2 = $('#Product-type-2');
        var Product_type_3 = $('#Product-type-3');
        $(product_2_container).hide();
        $(product_3_container).hide();
        $(product_1_container).hide();
        // Product type 1
        $(Product_type_1).click(function () {
            $(this).data('clicked', true);
            $(product_2_container).hide();
            $(product_3_container).hide();
            $(product_1_container).show();
        });
        // Product type 2
        $(Product_type_2).click(function () {
            $(this).data('clicked', true);
            $(product_1_container).hide();
            $(product_3_container).hide();
            $(product_2_container).show();
        });
        // Product type 3
        $(Product_type_3).click(function () {
            $(this).data('clicked', true);
            $(product_1_container).hide();
            $(product_2_container).hide();
            $(product_3_container).show();
        });
        // Image 
        $('#product-imgUpload').on('change', function () {
            var imgItem = $(this)[0].files;
            var imgCount = $(this)[0].files.length;
            var imgPath = $(this)[0].value;
            var imgExt = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
            var imagePreview = $('#product-imagePreview');
            imagePreview.empty();
            if (imgExt == 'gif' || imgExt == 'png' || imgExt == 'jpg' || imgExt == 'jpeg' || imgExt == 'bmp') {
                if (typeof (FileReader) != "undefined") {
                    for (var i = 0; i < imgCount; i++) {
                        var reader = new FileReader();
                        var fn = imgItem[i].name;
                        var fs = imgItem[i].size;
                        var ft = imgItem[i].type;
                        reader.onload = function (e) {
                            imagePreview.empty();
                            var Product_imagePreview1 = $('#Product-img1');
                            var Product_imagePreview2 = $('#Product-img2');
                            var Product_imagePreview3 = $('#Product-img3');
                            var src = e.target.result;
                            $(Product_imagePreview1).attr("src", src);
                            $(Product_imagePreview2).attr("src", src);
                            $(Product_imagePreview3).attr("src", src);
                            $("<img />", {
                                "src": e.target.result,
                                "width": "57px",
                                "height": "40px",
                                "title": fn + " and size " + fs + " bytes and type " + ft,
                                "alt": fn + " and size " + fs + " bytes and type " + ft
                            }).css({ "margin-left": "6.8px", "margin-top": "5px" }).appendTo(imagePreview);
                        }
                        imagePreview.show();
                        reader.readAsDataURL($(this)[0].files[i]);
                    }
                }
                else {
                    imagePreview.html("This Browser doesn't Support FileReader");
                }
            }
            else {
                imagePreview.html("Invalid File Format");
            }
        });
        // product name
        var textInput = $('input[type=text][id=product-text-input]')
        var textInputValue = $(textInput).val();
        $('#product-name-1, #product-name-2, #product-name-3').text(textInputValue);
        $(textInput).change(function () {
            textInputValue = $(this).val();
            $('#product-name-1, #product-name-2, #product-name-3').text(textInputValue);
        });
        /* Product Text Color */
        var colorInput = $('input[type=color][id=product-text-color-picker-interface]')
        var selectedColor = $(colorInput).val();
        $('#product-name-1, #product-name-2, #product-name-3').css("color", selectedColor);
        $(colorInput).change(function () {
            selectedColor = $(this).val();
            $('#product-name-1, #product-name-2, #product-name-3').css("color", selectedColor);
        });
        /* Product Text Type */
        var textType_dl = $("#product-text-type-dl");
        $(textType_dl).change(function () {
            var selected_textType = $(textType_dl).val();
            if (selected_textType == "Ubuntu") {
                $('#product-name-1, #product-name-2, #product-name-3').css("font-family", selected_textType);
            };
            if (selected_textType == "sans-serif") {
                $('#product-name-1, #product-name-2, #product-name-3').css("font-family", selected_textType);
            };
        });
        // Price name
        var textInput = $('input[type=text][id=product-price-input]')
        var textInputValue = $(textInput).val();
        $('#salary-1, #salary-2, #salary-3').text(textInputValue);
        $(textInput).change(function () {
            textInputValue = $(this).val();
            $('#salary-1, #salary-2, #salary-3').text(textInputValue);
        });
        /* price Text Color */
        var colorInput = $('input[type=color][id=product-price-text-color-picker-interface]')
        var selectedColor = $(colorInput).val();
        $('#salary-1, #salary-2, #salary-3').css("color", selectedColor);
        $(colorInput).change(function () {
            selectedColor = $(this).val();
            $('#salary-1, #salary-2, #salary-3').css("color", selectedColor);
        });
        /* price Text Type */
        var textType_dl = $("#product-price-text-type-dl");
        $(textType_dl).change(function () {
            var selected_textType = $(textType_dl).val();
            if (selected_textType == "Ubuntu") {
                $('#salary-1, #salary-2, #salary-3').css("font-family", selected_textType);
            };
            if (selected_textType == "sans-serif") {
                $('#salary-1, #salary-2, #salary-3').css("font-family", selected_textType);
            };
        });
        /* Circle Color */
        var colorInput = $('input[type=color][id=product-circle-color-picker-interface]')
        var selectedColor = $(colorInput).val();
        $('#salary-1, #salary-2').css("background-color", selectedColor);
        $(colorInput).change(function () {
            selectedColor = $(this).val();
            $('#salary-1, #salary-2').css("background-color", selectedColor);
        });
    });
    /* End Product button */


    /* Start Buttons button */
    // On click Buttons button
    $('#buttons-btn').click(function () {
        $(this).data("clicked", true);
        $('#buttons-angle-down').hide();
        $('#buttons-angle-up').show();
        $(this).css("background-color", "#347ce3");
        $(this).css("color", "#fff");
        // Change Style of other Buttons
        var otherAngleDown = $('#header-angle-down, #product-angle-down, #background-angle-down, #content-angle-down');
        var otherAngleUp = $('#header-angle-up, #product-angle-up, #background-angle-up, #content-angle-up');
        $(otherAngleDown).show();
        $(otherAngleUp).hide();
        var otherButtons = $('#header-btn, #product-btn, #background-btn, #content-btn');
        $(otherButtons).css("background-color", "#fff");
        $(otherButtons).css("color", "#000");
        // Hide Buttons Section 
        var otherSections = $('#background-section, #header-section, #product-section, #content-section');
        $(otherSections).hide();
        // Show iPhone Buttons 
        $('#iphone-buttons-container').show();
        // Show Buttons Section 
        $('#buttons-section').show();
        // Show parts of Buttons Sections
        var iPhone_Button_btn1 = $('#iphone-buttons-container #iphone_btn1');
        var iPhone_Button_btn2 = $('#iphone-buttons-container #iphone_btn2');
        var iphone_Button_btn1_link = $('#iphone_btn1_link');
        var iphone_Button_btn2_link = $('#iphone_btn2_link');
        var Button_btn1 = $('#buttons-btn-1');
        var Button_btn2 = $('#buttons-btn-2');
        var Radio_URL_btn = $('#open-url');
        var Radio_Link_btn = $('#play-video');
        var Button_color = $('#button-color-picker-interface');
        var Button_URl_Link = $('#URL-link-input');
        var Button_URl_Link_span = $('#URL-link_text');
        var Button_text = $('#button-text-input');
        var Button_text_color = $('#button-text-color-picker-interface');
        var Button_color_2 = $('#button-color-picker-interface-2');
        var Button_URl_Link_2 = $('#URL-link-input-2');
        var Button_URl_Link_span_2 = $('#URL-link_text-2');
        var Button_text_2 = $('#button-text-input-2');
        var Button_text_color_2 = $('#button-text-color-picker-interface-2');

        // Radio Button URL Function
        var radio_btn_url_fn = function () {
            /* Button URL Link  */
            $(Button_URl_Link_span).text('URL');
            /* Button Text */
            $(Button_text).attr("placeholder", "More Info");
        };
        // Radio Button Link Function
        var radio_btn_Link_fn = function () {
            /* Button URL Link  */
            $(Button_URl_Link_span).text('YouTube Link');
            /* Button Text */
            $(Button_text).attr("placeholder", "Play Video");
        };
        var radio_btn_url_fn_2 = function () {
            /* Button URL Link  */
            $(Button_URl_Link_span_2).text('URL');
            /* Button Text */
            $(Button_text_2).attr("placeholder", "More Info");
        };
        // Radio Button Link Function
        var radio_btn_Link_fn_2 = function () {
            /* Button URL Link  */
            $(Button_URl_Link_span_2).text('YouTube Link');
            /* Button Text */
            $(Button_text_2).attr("placeholder", "Play Video");
        };
        // Radio Button Type 
        var id = $('input[type=radio][name=optradio]:checked').attr('id');
        $('input[type=radio][name=optradio]').change(function () {
            id = $('input[type=radio][name=optradio]:checked').attr('id');
            /* Button Type */
            if (id == "open-url") {
                radio_btn_url_fn();
                radio_btn_url_fn_2();
            }
            if (id == ("play-video")) {
                radio_btn_Link_fn();
                radio_btn_Link_fn_2();
            }
        })

        // Button 1 section
        var btn1_section_fn = function () {
            $(Button_btn2).removeClass('focus');
            $(Button_btn1).addClass('focus');
            $('#btn-info-1').show();
            $('#btn-info-2').hide();
            /* Button Color */
            if ($(Button_color).data('changed') != true) {
                $(Button_color).val('#347ce3');
            }
            var selectedColor = $(Button_color).val();
            $(iPhone_Button_btn1).css("background-color", selectedColor);
            $(Button_color).change(function () {
                $(this).data("changed", true);
                selectedColor = $(this).val();
                $(iPhone_Button_btn1).css("background-color", selectedColor);
            });
            /* Button URL Link */
            var textInputValue = $(Button_URl_Link).val();
            $(iphone_Button_btn1_link).attr('href', textInputValue);
            $(Button_URl_Link).change(function () {
                textInputValue = $(this).val();
                $(iphone_Button_btn1_link).attr('href', textInputValue);
            });
            /* Button Text */
            var textInputValue = $(Button_text).val();
            $(iPhone_Button_btn1).text(textInputValue);
            $(Button_text).change(function () {
                textInputValue = $(this).val();
                $(iPhone_Button_btn1).text(textInputValue);
            });
            /* Button Text Color */
            var selectedColor = $(Button_text_color).val();
            $(iPhone_Button_btn1).css("color", selectedColor);
            $(Button_text_color).change(function () {
                selectedColor = $(this).val();
                $(iPhone_Button_btn1).css("color", selectedColor);
            });
        };
        if ($(Button_btn2).data('clicked') != true) {
            btn1_section_fn();
        }
        $(Button_btn1).click(function () {
            btn1_section_fn();
        });

        // Button 2 section
        $(Button_btn2).click(function () {
            $(this).data("clicked", true);
            $(Button_btn1).removeClass('focus');
            $(Button_btn2).addClass('focus');
            $('#btn-info-2').show();
            $('#btn-info-1').hide();
            /* Button Color */
            if ($(Button_color_2).data('changed') != true) {
                $(Button_color_2).val('#01bbea');
            }
            var selectedColor = $(Button_color_2).val();
            $(iPhone_Button_btn2).css("background-color", selectedColor);
            $(Button_color_2).change(function () {
                $(this).data("changed", true);
                selectedColor = $(this).val();
                $(iPhone_Button_btn2).css("background-color", selectedColor);
            });
            /* Button URL Link */
            var textInputValue = $(Button_URl_Link_2).val();
            $(iphone_Button_btn2_link).attr('href', textInputValue);
            $(Button_URl_Link_2).change(function () {
                textInputValue = $(this).val();
                $(iphone_Button_btn2_link).attr('href', textInputValue);
            });
            /* Button Text */
            var textInputValue = $(Button_text_2).val();
            $(iPhone_Button_btn2).text(textInputValue);
            $(Button_text_2).change(function () {
                textInputValue = $(this).val();
                $(iPhone_Button_btn2).text(textInputValue);
            });
            /* Button Text Color */
            var selectedColor = $(Button_text_color_2).val();
            $(iPhone_Button_btn2).css("color", selectedColor);
            $(Button_text_color_2).change(function () {
                selectedColor = $(this).val();
                $(iPhone_Button_btn2).css("color", selectedColor);
            });
        });
    });
    /* End Buttons button */

    /* Finish Button Section */
    $('#finish').click(function () {
        var stepsContainer = $('.steps');
        var finishMessage = $('#finishMessage');
        var finishFormResult = $('#finishFormResult');
        var designSection = $('#designSection');
        var finishButton = $('#finish');
        var backButton = $('#back');
        var nameInputForm = $('#nameInputForm').val();
        var brandInputForm = $('#brandInputForm').val();
        var shopInputForm = $('#shopInputForm').val();
        var beconsInputForm = $('#beconsInputForm').val();
        var outsideInputForm = $('#outsideInputForm').val();
        var genderInputForm = $('#genderInputForm').val();
        var ageInputForm = $('#ageInputForm').val();
        var timeFrimeInputForm = $('#timeFrimeInputForm').val();
        var startTimeInputForm = $('#startTimeInputForm').val();
        var endTimeInputForm = $('#endTimeInputForm').val();
        var nameResult = $('#nameResult');
        var placeResult = $('#placeResult');
        var triggerResult = $('#triggerResult');
        var profileResult = $('#profileResult');
        var timeFrimeResult = $('#timeFrimeResult');
        var startTimeResult = $('#startTimeResult');
        var endTimeResult = $('#endTimeResult');
        /* Hide Previous Section and Show this Section */
        $(stepsContainer).hide();
        $(designSection).hide();
        $(finishButton).hide();
        $(backButton).hide();
        $(finishMessage).show();
        $(finishFormResult).show();
        /* Margin Top of Design Section */
        $('#design-section').css('margin-top', '15px');
        /* update finish form section data */
        $(nameResult).text(nameInputForm);
        $(placeResult).text(brandInputForm + ' / ' + shopInputForm);
        $(triggerResult).text(beconsInputForm + ' / ' + outsideInputForm);
        $(profileResult).text(genderInputForm + ' / ' + ageInputForm);
        $(timeFrimeResult).text(timeFrimeInputForm);
        $(startTimeResult).text(startTimeInputForm);
        $(endTimeResult).text(endTimeInputForm);
    });
});
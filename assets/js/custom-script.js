jQuery(document).ready(function(){
    

    var loading_items = Array('1','2','3','4','5','6','7','8','9','10');
    var loading_item = loading_items[Math.floor(Math.random()*loading_items.length)];

    jQuery(document).ready(function(){
        jQuery('.switch-heading').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: ".next-btn",
          prevArrow: ".prev-btn",
          speed: 100,
          autoplay:true,
          arrow: false,
          fade: true,
        });
    });

    // admin generate idea

    // get all ideas on page load
    var ideas = [];
    var ideas_count = 0;
   

    function get_ideas_ajax(){
        let formdata = new FormData();
        formdata.append('action','get_idea_action');
        jQuery.ajax({
            type: "post",
            data : formdata,
            dataType: 'json',
            url: opt.ajaxUrl,
            success: function(msg){
                // jQuery(".generated_idea").text(msg);
                ideas = msg;
                ideas_count = ideas.length;
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }


    get_ideas_ajax();


    let count = 0;

    jQuery(document).on("click", ".generate_idea_btn", function(e){
        e.preventDefault();
        jQuery(".generate_idea_btn").attr('disabled', 'disabled');
        jQuery('.ig_idea_loading_third').html("");
        if(opt.ig_access == "not_played" && opt.pmpro_data == "free"){
            if(count == 3){
                jQuery(".generated_idea").text("Please upgrade your package to keep getting amazing ideas");
    
                let formdata = new FormData();
                formdata.append('action','restrict_free_user_action');
                jQuery.ajax({
                    type: "post",
                    data : formdata,
                    dataType: 'json',
                    url: opt.ajaxUrl,
                    success: function(msg){},
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
            else{
                var loading_html = `<img src="${opt.link_for_img}assets/img/loading-${loading_item}.gif" style="width: 200px;"/><h3 style=""margin: 0;>Generating Idea<h3>`;
                jQuery(".ig_idea_loading_first").html(loading_html);
                // alert(loading_html)
                if(count == 0){
                    jQuery('.ig_main_content').hide();
                    jQuery(".ig_idea_loading_first").fadeIn(400);
                    setTimeout(function(){
                        jQuery(".ig_idea_loading_first").hide();
                        jQuery('.ig_idea_loading_second').fadeIn(400).delay(2000).fadeOut(400, function(){
                            jQuery('.ig_main_content').fadeIn(400);
                        });
                    }, 2000);

                    if(ideas.length != 0){
                        // console.log(ideas[0]);
                        jQuery(".generated_idea").text(ideas[0]);
                        ideas = ideas.slice(1);
                        count++;
                    }else{
                        jQuery(".reset_idea_btn").trigger('click');
                        jQuery(".reset_idea_btn").css('display', 'none');
                        jQuery(".buttons_container").css('text-align', 'center');
                    }
                    jQuery(".generate_idea_btn").removeAttr('disabled');
                }
                else{
                    // jQuery('.ig_idea_loading_third').html("");
                    // jQuery(".generate_idea_btn").attr('disabled', 'disabled');
                    let timeout_seconds = 3000;
                    if(ideas.length != 0 && count < ideas_count){
                        jQuery(".generated_idea").text("Please Wait...");
                        jQuery('.ig_idea_loading_third').html(`<img src="${opt.link_for_img}assets/img/load_second.gif?${Date.now()}" style="width: 250px;"/>`);
                        
                    }else{
                        timeout_seconds = 500;
                    }
                    console.log(count + " " + ideas_count);
                    setTimeout(function(){
                        jQuery('.ig_idea_loading_third').html("");

                        if(ideas.length != 0){
                            // console.log(ideas[0]);
                            jQuery(".generated_idea").text(ideas[0]);
                            ideas = ideas.slice(1);
                            count++;
                        }else{
                            jQuery(".reset_idea_btn").trigger('click');
                            jQuery(".reset_idea_btn").css('display', 'none');
                            jQuery(".buttons_container").css('text-align', 'center');
                        }
                        jQuery(".generate_idea_btn").removeAttr('disabled');
                    }, timeout_seconds);

                    
                }

                jQuery('.inner_container h3.ig_main_heading, .inner_container .switch-heading p').css('font-size', '0');
                jQuery('.hero_container .inner_container').removeClass('ig_line_container');

                // if(ideas.length != 0){
                //     // console.log(ideas[0]);
                //     jQuery(".generated_idea").text(ideas[0]);
                //     ideas = ideas.slice(1);
                //     count++;
                // }else{
                //     jQuery(".reset_idea_btn").trigger('click');
                //     jQuery(".reset_idea_btn").css('display', 'none');
                //     jQuery(".buttons_container").css('text-align', 'center');
                // }

                if(count > 0){
                    
                    jQuery(".buttons_container").css('text-align', 'right');
                }
                if(count >= 4){
                    jQuery(".reset_idea_btn").css('display', 'inline-block');
                    jQuery(".hero_container .ig_idea_loading_third").css("right","160px");
                }
            }
        }
        else if(opt.ig_access == "played" && opt.pmpro_data == "free"){
            jQuery(".generated_idea").text("Ugrade your package for unlimited access.");
        }
        // PAID
        else{
            var loading_html = `<img src="${opt.link_for_img}assets/img/loading-${loading_item}.gif" style="width: 250px;"/><h3>Generating Idea<h3>`;
            jQuery(".ig_idea_loading_first").html(loading_html);
            // alert(loading_html)
            if(count == 0){
                jQuery('.ig_main_content').hide();
                jQuery(".ig_idea_loading_first").fadeIn(400);
                setTimeout(function(){
                    jQuery(".ig_idea_loading_first").hide();
                    jQuery('.ig_idea_loading_second').fadeIn(400).delay(2000).fadeOut(400, function(){
                        jQuery('.ig_main_content').fadeIn(400);
                    });
                }, 2000);

                if(ideas.length != 0){
                    // console.log(ideas[0]);
                    jQuery(".generated_idea").text(ideas[0]);
                    ideas = ideas.slice(1);
                    count++;
                }else{
                    jQuery(".reset_idea_btn").trigger('click');
                    jQuery(".reset_idea_btn").css('display', 'none');
                    jQuery(".buttons_container").css('text-align', 'center');
                }
                jQuery(".generate_idea_btn").removeAttr('disabled');
            }
            else{
                // jQuery('.ig_idea_loading_third').html("");
                jQuery(".generate_idea_btn").attr('disabled', 'disabled');
                let timeout_seconds = 3000;
                if(ideas.length != 0 && count < ideas_count){
                    jQuery(".generated_idea").text("Please Wait...");
                    jQuery('.ig_idea_loading_third').html(`<img src="${opt.link_for_img}assets/img/load_second.gif?${Date.now()}" style="width: 250px;"/>`);
                    
                }else{
                    timeout_seconds = 500;
                }
                console.log(count + " " + ideas_count);
                setTimeout(function(){
                    jQuery('.ig_idea_loading_third').html("");

                    if(ideas.length != 0){
                        // console.log(ideas[0]);
                        jQuery(".generated_idea").text(ideas[0]);
                        ideas = ideas.slice(1);
                        count++;
                    }else{
                        jQuery(".reset_idea_btn").trigger('click');
                        jQuery(".reset_idea_btn").css('display', 'none');
                        jQuery(".buttons_container").css('text-align', 'center');
                    }
                    jQuery(".generate_idea_btn").removeAttr('disabled');
                }, timeout_seconds);

                
            }

            jQuery('.inner_container h3.ig_main_heading, .inner_container .switch-heading p').css('font-size', '0');
            jQuery('.hero_container .inner_container').removeClass('ig_line_container');

            // if(ideas.length != 0){
            //     // console.log(ideas[0]);
            //     jQuery(".generated_idea").text(ideas[0]);
            //     ideas = ideas.slice(1);
            //     count++;
            // }else{
            //     jQuery(".reset_idea_btn").trigger('click');
            //     jQuery(".reset_idea_btn").css('display', 'none');
            //     jQuery(".buttons_container").css('text-align', 'center');
            // }

            if(count > 0){
                
                jQuery(".buttons_container").css('text-align', 'right');
            }
            if(count >= 4){
                jQuery(".reset_idea_btn").css('display', 'inline-block');
                jQuery(".hero_container .ig_idea_loading_third").css("right","140px");
            }
        }
        
        // jQuery(".generate_idea_btn").removeAttr('disabled');
    });

    jQuery(document).on("click", ".reset_idea_btn", function(e){
        e.preventDefault();
        ideas = [];
        get_ideas_ajax();
        count = 0;
        jQuery(".generated_idea").text('');
        jQuery('.inner_container h3.ig_main_heading, .inner_container .switch-heading p').removeAttr("style");
        jQuery('.hero_container .inner_container').addClass('ig_line_container');
        jQuery(".reset_idea_btn").css('display', 'none');
        jQuery(".buttons_container").css('text-align', 'center');
        loading_item = loading_items[Math.floor(Math.random()*loading_items.length)];
        jQuery(".hero_container .ig_idea_loading_third").css("right","15px");
    });

});
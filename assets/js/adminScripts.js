jQuery(document).ready(function(){


    // admin generate idea
    jQuery(document).on("submit", "#create_idea", function(e){
        e.preventDefault();
        let formdata = new FormData(this);
        formdata.append('action','admin_generate_idea_action');
        jQuery.ajax({
            type: "post",
            data : formdata,
            url: opt.ajaxUrl,
            success: function(msg){
                let split_msg = msg.split("|");
                if(split_msg[0] == "success"){
                    location.reload();
                }
                else{
                    alert(split_msg[1]);
                    location.reload();
                }
                
            },
            cache: false,
            contentType: false,
            processData: false
        });
    });


    // admin delete idea
    jQuery(document).on("click", ".delete_idea", function(e){
        e.preventDefault();
        var result = confirm("Confirm delete idea?");
        if (result) {
            let formdata = new FormData();
            let idea_id = jQuery(this).attr('data-id');
            formdata.append('action','admin_delete_idea_action');
            formdata.append('idea_id', idea_id);
            jQuery.ajax({
                type: "post",
                data : formdata,
                url: opt.ajaxUrl,
                success: function(msg){
                    let split_msg = msg.split("|");
                    if(split_msg[0] == "success"){
                        location.reload();
                    }
                    else{
                        alert(split_msg[1]);
                        location.reload();
                    }
                    
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }
        else{
            return;
        }
        
    });

});
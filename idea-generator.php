<?php
/*

    Plugin Name: Idea Generator

    Plugin URI: https://www.ideagenerator.com

    Description: Generate ideas for users / Workes with paid membership pro.

    Author: John Doe

    Version: 1.0

    Author URI: https://www.ideagenerator.com

*/

if (!defined('ABSPATH')):
    die("You are not allowed to access protected files directly");
endif;

define( 'IDEA_GENERATOR_PATH', plugin_dir_path( __FILE__ ) );	// define the absolute plugin path for includes

// create required table(s) on plugin activate
function idea_fenerator_plugin_sql_tables()
{      
  	global $wpdb; 
  	$charset_collate = $wpdb->get_charset_collate();
	
	$sql1 = "CREATE TABLE IF NOT EXISTS `generate_idea`(
			`id` int(11) NOT NULL AUTO_INCREMENT,
            `idea` varchar(999) NOT NULL,      
			PRIMARY KEY  (id) )$charset_collate;";
	
	$queries = array();
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	array_push($queries,$sql1);
	foreach ($queries as $key => $sql) {
		dbDelta( $sql );
	}
}
register_activation_hook( __FILE__, 'idea_fenerator_plugin_sql_tables' );



// enqueue styles and scripts
function idea_enqueue_scripts() {
		$theme_info = wp_get_theme();

        $pmpro_data = metadata_exists( 'user', get_current_user_id(), 'pmpro_CardType' ) ? "paid" : "free";
        $ig_access = metadata_exists( 'user', get_current_user_id(), 'ig_access' ) ? true : false;
        if($pmpro_data == "free" && !$ig_access){
            update_usermeta(get_current_user_id(), 'ig_access', 'not_played');
            $ig_access = 'not_played';
        }
        if($pmpro_data == "free" && $ig_access){
            $ig_access = get_usermeta(get_current_user_id(), 'ig_access');
        }
        // wp_enqueue_style('bootstrap4', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
		// wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
        wp_enqueue_style( 'custom_styles', plugins_url('/assets/css/custom_styles.css', __FILE__), array(), $theme_info->get( 'Version' ), false );

        wp_enqueue_script('slick', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js', array('jquery'));
        wp_enqueue_style( 'slick-style', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css' );
		//**register script**//		
		// wp_enqueue_script('bootstrap-script', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js', array('jquery'), $theme_info->get( 'Version' ), true);
        // wp_enqueue_script('bootstrap-script', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', array('jquery'), $theme_info->get( 'Version' ), true);
		
        wp_enqueue_script('custom-script', plugins_url('/assets/js/custom-script.js', __FILE__), array('jquery'), $theme_info->get( 'Version' ), true);
        wp_localize_script(
			'custom-script',
			'opt',
			array('ajaxUrl' => admin_url('admin-ajax.php'),
			'noResults' => esc_html__('No data found', 'textdomain'),
            'pmpro_data' => $pmpro_data,
            'ig_access' => "paid",
            'link_for_img' => plugin_dir_url( __FILE__ ),
			)
		);
}
add_action('wp_enqueue_scripts', 'idea_enqueue_scripts');




// enqueue admin scripts
function load_custom_wp_admin_style($hook) {
    $theme_info = wp_get_theme();
    // Load only on ?page=mypluginname
    // echo $hook;
    if( $hook != 'toplevel_page_idea-generator') {
            return;
    }
    wp_enqueue_style( 'admin_styles_css', plugins_url('/assets/css/admin_styles.css', __FILE__), array(), $theme_info->get( 'Version' ), false );
    wp_enqueue_style('bootstrap4', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
    // wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_script('bootstrap-script', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', array('jquery'), $theme_info->get( 'Version' ), true);
    wp_enqueue_script('admin-script', plugins_url('/assets/js/adminScripts.js', __FILE__), array('jquery'), $theme_info->get( 'Version' ), true);
    wp_localize_script(
        'admin-script',
        'opt',
        array('ajaxUrl' => admin_url('admin-ajax.php'),
        'noResults' => esc_html__('No data found', 'textdomain'),
                )
    );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );


// Admin Menu
function my_admin_menu() {
    add_menu_page(
        __( 'Idea Generator', 'my-textdomain' ),
        __( 'Idea Generator', 'my-textdomain' ),
        'manage_options',
        'idea-generator',
        'my_admin_page_contents',
        'dashicons-schedule'
    );
}
add_action( 'admin_menu', 'my_admin_menu' );

function my_admin_page_contents() {
    global $wpdb;
    ?>
        <div class="wrap">
            <div id="registration_form" style='width:100%'>
                <div id="post-body" class="metabox-holder columns-2">
                    <div id="post-body-content">
                        <div class="meta-box-sortables ui-sortable">
                            <div class="create-idea-container mt-3 mb-4">
                                <form class="form-inline" id="create_idea">
                                    <div class="form-group mx-sm-3 mb-3 mt-3">
                                        <h4 class="sr-only mb-2">New Idea</h4>
                                        <input type="text" class="form-control" id="new_idea" name="new_idea" placeholder="Idea" style="max-width: 75%;">
                                    </div>
                                    <button type="submit" class="btn btn-primary mb-2" style="margin-left: 16px;">Create Idea</button>
                                </form>
                            </div>
							<h1>Ideas</h1>							
							<table class="sp_table">
                                <tr>
                                    <th>S no</th>
                                    <th>Ideas</th>
                                    <th colspan="2">Action</th>
                                </tr>
                                <?php
                                $querystr = "SELECT * FROM `generate_idea` ORDER BY id DESC";
                                $query_results = $wpdb->get_results($querystr);
                                if (!empty($query_results)) {
                                    $i = 1;
                                    foreach ($query_results as $results){
                                ?>
                               <tr>
                                    <td><?php echo $i; ?></td>
                                    <td><?php echo $results->idea; ?></td>
                                    <td><?php echo '<a href="javascript:void(0)" class="delete_idea" data-id="'.$results->id.'">Delete</a>'; ?></td>       
                                </tr>
                                <?php
                                        $i++;
                                    }
                                }
                                ?>
                            </table>
                        </div>
                    </div>
                </div>
                <br class="clear">
            </div>
        </div>
    <?php
}



// create idea
add_action( 'wp_ajax_admin_generate_idea_action', 'admin_generate_idea_funt' );
add_action( 'wp_ajax_nopriv_admin_generate_idea_action', 'admin_generate_idea_funt' );
function admin_generate_idea_funt(){
    global $wpdb;
    $new_idea = $_POST['new_idea'] ? $_POST['new_idea'] : "";
    if(!empty( $new_idea )){
        $data_return_from_query = $wpdb->insert("generate_idea", array(
			"idea" => $new_idea,
		));
		if($data_return_from_query ==  1){
			echo "success" . "|" . "Idea Generated.";
		}
        else{
            echo "error|There has been an error generating your idea, Please try again later.";
        }
    } 
    else{
        echo "error|Please fill all required fields.";
    } 

    die();
}

// delete idea
add_action( 'wp_ajax_admin_delete_idea_action', 'admin_delete_idea_funt' );
add_action( 'wp_ajax_nopriv_admin_delete_idea_action', 'admin_delete_idea_funt' );
function admin_delete_idea_funt(){
    global $wpdb;
    $idea_id = $_POST['idea_id'] ? $_POST['idea_id'] : "";
    $status = $wpdb->delete('generate_idea', array('id'=>$idea_id));
    if($status == 1){
        echo "success|Idea Deleted Successfully";
    }
    else{
        echo "error|Sorry! There seems to be a problem, Please try again";
    }

    die();
}



// frontend shortcode
function generate_idea_func(){
	global $wpdb;
    $data_to_return = '
    <div class="hero_container">
        <!-- <h2>Idea Generator Tool</h2> -->
        <div class="inner_container ig_line_container">
            <div class="ig_main_content">
                <h3 class="ig_main_heading">A better, 10X faster way to write</h3>
                <div class="switch-heading">
                    <div>
                        <p>to generate ideas</p>
                    </div>
                    <div>
                        <p>to generate Great ideas</p>
                    </div>
                    <div>
                        <p>to generate Creative ideas</p>
                    </div>
                </div>
                <p class="generated_idea"></p>
                <div class="buttons_container">
                    <span style="position: relative;"><button class="generate_idea_btn">GENERATE IDEA</button></span>
                    <a href="javascript:void(0)" class="reset_idea_btn" style="display: none;">Reset</a>
                </div>
            </div>
            <div class="ig_idea_loading_first" style="text-align: center; max-height: 200px">

            </div>
            <div class="ig_idea_loading_second" style="text-align: center;">
                <img src="'.plugin_dir_url( __FILE__ ).'assets/img/load_second.gif" style="width: 25%;" />
                <img src="'.plugin_dir_url( __FILE__ ).'assets/img/load_second_balloon.gif" style="width: 25%;" />
                <img src="'.plugin_dir_url( __FILE__ ).'assets/img/load_second.gif" style="width: 25%;" />
            </div>
            <div class="ig_idea_loading_third">
                
            </div>
        </div>
        
    </div>
    ';
    return $data_to_return;
}
add_shortcode( 'GenerateIdea', 'generate_idea_func' );



// get idea
add_action( 'wp_ajax_get_idea_action', 'get_idea_funt' );
add_action( 'wp_ajax_nopriv_get_idea_action', 'get_idea_funt' );
function get_idea_funt(){
    global $wpdb;
    $idea = array();
    $i = 0;
    $querystr = "SELECT * FROM `generate_idea` ORDER BY rand()";
    $query_results = $wpdb->get_results($querystr);
    
    if (!empty($query_results)) {
        foreach ($query_results as $results){
            $idea[$i] = $results->idea;
            $i++;
        }
    }

   echo json_encode($idea);
    die();
}



// add_action( 'wp_ajax_first_time_ig_action', 'first_time_ig_funt' );
// add_action( 'wp_ajax_nopriv_first_time_ig_action', 'first_time_ig_funt' );
// function first_time_ig_funt(){
//     global $wpdb;
//     $uid = get_current_user_id();
//     $pmpro_data = metadata_exists( 'user', get_current_user_id(), 'pmpro_CardType' ) ? "paid" : "free";
//     update_usermeta($uid, 'ig_access', 'first_time');
//     die();
// }

add_action( 'wp_ajax_restrict_free_user_action', 'restrict_free_user_funt' );
add_action( 'wp_ajax_nopriv_restrict_free_user_action', 'restrict_free_user_funt' );
function restrict_free_user_funt(){
    global $wpdb;
    $uid = get_current_user_id();
    update_usermeta($uid, 'ig_access', 'played');
    die();
}




// styles in header


add_action('wp_head', 'add_styles_in_header');
function add_styles_in_header(){
    ?>
    <style>
        .hero_container .inner_container::before{
            background: url(<?php echo plugin_dir_url( __FILE__ ) . 'assets/img/line-animation.gif'; ?>) !important;
        }
        .hero_container .inner_container .buttons_container span::after{
            background: url(<?php echo plugin_dir_url( __FILE__ ) . 'assets/img/btn_anim.gif'; ?>);
        }
        .hero_container .inner_container.button_animation_container::after{
            background: url(<?php echo plugin_dir_url( __FILE__ ) . 'assets/img/load_second.gif'; ?>);
        }
    </style>
    <?php
}
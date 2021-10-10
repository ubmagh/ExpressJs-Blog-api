var itemsPerpage = 10;
var currentPage= 1;
var usersList = [];

function setItemsPerPage(num){
    itemsPerpage = num;
    const items = $('.itemsPerPage')[0].childNodes;
    items.forEach( node=>{
        if( parseInt( $(node).data('c') )== num  ){
            $(node).attr('disabled',true);
            $(node).addClass('btn-info').removeClass('btn-outline-info');
        }
        else{
            $(node).removeAttr('disabled');
            $(node).removeClass('btn-info').addClass('btn-outline-info');
        }
    });
    currentPage = 1;
    render_pagination();
    fetch_users();
}

const users_SetLoading = bool =>{
    if(bool){
        $('#usersList_Loading').removeClass('d-none').addClass('d-flex');$('#usersList_content').addClass('d-none');$('#usersfooter').addClass('d-none');
    }else{
        $('#usersList_Loading').removeClass('d-flex').addClass('d-none'); $('#usersList_content').removeClass('d-none');$('#usersfooter').removeClass('d-none');
    }
}

function fetch_users(){
    users_SetLoading(true);
    $.get( "/api/users", { limit: parseInt(itemsPerpage), offset: parseInt( (currentPage-1)*itemsPerpage ) }).done(data=>{ usersList = data; RenderUsersList(usersList); render_pagination(); users_SetLoading(false); }).fail(()=>{
        $('#usersList').empty().append('<tr class="bg-danger"><td colspan="5" class="text-center"> Une erreur est servenue !  </td></tr>');users_SetLoading(false);
    });
}


const RenderUsersList = (usersList)=>{
    const parent = $('#usersList');
    if( Array.isArray(usersList) && usersList.length>0 ){
        parent.empty();
        let badge=email=null;
        let num = (currentPage-1) * itemsPerpage  +1 ;
        usersList.forEach(  
            user=>{
                switch(user.role){
                    case "guest":
                        badge = '<span class="badge bg-secondary">guest</span>'; break;
                    case "admin":
                        badge = '<span class="badge bg-dark">admin</span>'; break;
                    case "author":
                        badge = '<span class="badge bg-warning">author</span>'; break;
                }
                email = '<a href="mailto:'+user.email+'" class="text-decoration-none">'+user.email+'</a>';
                parent.append(`<tr> <td><strong>${(num++)}</strong></td> <td>${user.username}</td> <td>${email}</td> <td>${badge}</td> <td> <button type="button" class="btn btn-success me-1" onclick="edit_user(${user.id})"><i class="fas fa-pen"></i></button> <button type="button" class="btn btn-danger ms-1" onclick="delete_user(${user.id})"><i class="fas fa-trash"></i></button> </td></tr>`);
            }
        );
    }else{
        parent.empty();
        parent.append(' <tr class="bg-warning"><td colspan="5" class="text-center"> Aucun utilisateur n\'a été trouvé !  </td></tr> ');
    }
}

function user_previousPage(){
    if(currentPage<=1)
    return;
    currentPage--;
    fetch_users();
}
function user_gotoPage(page){
    currentPage = page;
    fetch_users();
}
function user_nextPage(){
    currentPage++;
    fetch_users();
}

function render_pagination(){
    var pages =0;
    $.get( "/api/users/count", null).done(data=>{ 
        pages = parseInt(data.num);
        pages =  Math.ceil( pages/itemsPerpage ); 
        let tiles=[
            `
            <li class="page-item ${(currentPage<=1)?'disabled':''}">
                <button type="button" class="page-link" ${(currentPage<=1)?'disabled':''} onclick="user_previousPage()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            `
        ];
        if(pages>5){
            for(let i=pages-2; i<pages+3; i++){
                tiles.push(`
                <li class="page-item ${(currentPage==i)? 'active':''}"><button type="button" onclick="user_gotoPage(${i})"  class="page-link" >${i}</button></li>
                `);
            }
        }else{
            for(let i=1; i<=pages; i++){
                tiles.push(`
                <li class="page-item ${(currentPage==i)? 'active':''}"><button type="button" onclick="user_gotoPage(${i})" class="page-link" >${i}</button></li>
                `);
            }
        }
        tiles.push(`
                <li class="page-item ${ (currentPage>=pages)?'disabled':'' }">
                    <button type="button" class="page-link" onclick="user_nextPage()" ${ (currentPage>=pages)?'disabled':'' } aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
        `);
        let paginationUL = $('#pagination').empty();
        tiles.forEach(node=>paginationUL.append(node));

        if(pages>0){
            $('#usersfooter').removeClass('d-none');
        }
    });
}

/*** Start : user creating modal   */
const createUserModal = document.getElementById('CreateUserModal')
createUserModal.addEventListener('hidden.bs.modal', function (event) {
    $(createUserModal).find('.modal-body').find('input').val('');
    $($(createUserModal).find('option')[0]).removeAttr('selected').attr('selected',true);
    $('.userCreateForm').removeClass('d-none');
    $('.CU_success').addClass('d-none');
    $('.notSubmittedC').removeClass('d-none');
    $('.SubmittedC').addClass('d-none');
    $('.err').addClass('d-none');
});

function DisplayError( id, message){
    $(id).text(message);
    $(id).parent().removeClass('d-none').addClass('show');
}

$('.closeErr').click(e=>{
    $(e.target).parent().removeClass('show').addClass('d-none').find('p').text('');
});

function createUser(){
    let [ username, email, role, psswd1, psswd2, err ] = [ $('#username').val(), $('#email').val(), $('#role').val(), $('#psswd').val(), $('#psswd2').val(), false];
    [ username, email, role, psswd1, psswd2 ].forEach( ele =>{
        ele = $.trim(ele);
    } );
    if( !username ){
        DisplayError( '#CU_username', " Saisissez le pseudo-nom ");    
        err = !0;
    }
    if( psswd2.length <8 ){
        DisplayError( '#CU_pwd1', " le mot de passe doit etre de 8 caractères au min. ");    
        err = !0;
    }
    if( psswd1 != psswd2 ){
        DisplayError( '#CU_pwd2', " La confirmation du mot de passe est erronée !");    
        err = !0;
    }
    if( err ) return;  
    $.ajax({ // $.post(...)  : met l'objet en paires dans un corps form-data, alors qu'il est impossible d'envoyer un objet dans un objet !!
        url: '/api/users',
        type: 'POST',
        data: JSON.stringify({ user : { "username" : username, "email": email, "role": role, "password": psswd1} }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //async: false,
        success: function(resp) {
            $('.userCreateForm').addClass('d-none');
            $('.CU_success').removeClass('d-none');
            console.log(resp);
            const user= {username: resp.username, role: resp.role, password: resp.password, id: resp.id, email: resp.email  } 
            $('.notSubmittedC').addClass('d-none');
            $('.SubmittedC').removeClass('d-none');
            usersList.push(user);
            RenderUsersList(usersList);
            render_pagination();
        },
        error : function(resp){
            const errors = resp.responseJSON.errors; 
            if( !errors || !errors.hasErr ){
                alert('Une erreur servenu ! voir la console ');
                console.log(resp);
            }else{
                if( errors.username )
                    DisplayError( "#CU_username", errors.username);
                if( errors.email )
                    DisplayError( "#CU_email", errors.email);
                if( errors.role )
                    DisplayError( "#CU_role", errors.role);
                if( errors.password )
                    DisplayError( "#CU_pwd1", errors.password);
            }
            $('.notSubmittedC').removeClass('d-none');
            $('.SubmittedC').addClass('d-none');
        }
    });
}

/*** End : user creating modal  */





/** Start : user edit modal */

const EditUserModal = document.getElementById('EditUserModal')
EditUserModal.addEventListener('hidden.bs.modal', function (event) {
    $(EditUserModal).find('.modal-body').find('input').val('');
    $($(EditUserModal).find('option')[0]).removeAttr('selected').attr('selected',true);
    $('.userEditForm').removeClass('d-none');
    $('.EU_success').addClass('d-none');
    const saveBtn = $('#EditUserModal .modal-footer').find('button')[0];
    $(saveBtn).data( 'userid', null);
    $('.notSubmittedE').removeClass('d-none');
    $('.SubmittedE').addClass('d-none');
    $('.err').addClass('d-none');
});

function edit_user( id){
    const editModal = new bootstrap.Modal(document.getElementById('EditUserModal'));
    const user = usersList.find( user=> user.id == id ); // getting our user that will be updated
    $('#Eusername').val(user.username);
    $('#Eemail').val(user.email);
    $('#Erole').val(user.role);
    $('#Epsswd').val(user.password);
    $('#Epsswd2').val(user.password);
    const saveBtn = $('#EditUserModal .modal-footer').find('button')[0];
    $(saveBtn).data( 'userid', id);
    editModal.show();
}

function updateUser(){
    const saveBtn = $('#EditUserModal .modal-footer').find('button')[0];
    const userid=  $(saveBtn).data( 'userid');
    let [ id, username, email, role, psswd1, psswd2, err ] = [ parseInt(userid), $('#Eusername').val(), $('#Eemail').val(), $('#Erole').val(), $('#Epsswd').val(), $('#Epsswd2').val(), false];
    [ username, email, role, psswd1, psswd2 ].forEach( ele =>{
        ele = $.trim(ele);
    } );
    if( !userid ){
        DisplayError( '#EU_id', " Une erreur est servenue, Veuillez actualiser la page ! ");    
        err = !0;
    }
    if( !username ){
        DisplayError( '#EU_username', " Saisissez le pseudo-nom ");    
        err = !0;
    }
    if( psswd2.length <8 ){
        DisplayError( '#EU_pwd1', " le mot de passe doit etre de 8 caractères au min. ");    
        err = !0;
    }
    if( psswd1 != psswd2 ){
        DisplayError( '#EU_pwd2', " La confirmation du mot de passe est erronée !");    
        err = !0;
    }
    if( err ) return;  
    $.ajax({ // $.post(...)  : met l'objet en paires dans un corps form-data, alors qu'il est impossible d'envoyer un objet dans un objet !!
        url: '/api/users',
        type: 'PUT',
        data: JSON.stringify({ user : { "id": userid, "username" : username, "email": email, "role": role, "password": psswd1} }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //async: false,
        success: function(resp) {
            $('.userEditForm').addClass('d-none');
            $('.EU_success').removeClass('d-none');
            usersList.map( elem=>{
                if( elem.id == resp.id){
                    elem.username = resp.username;
                    elem.role = resp.role;
                    elem.email = resp.email;
                    elem.password = resp.password;
                }
            } );
            $('.notSubmittedE').addClass('d-none');
            $('.SubmittedE').removeClass('d-none');
            RenderUsersList( usersList ); // actualiser les enregistrements dans le tableau
        },
        error : function(resp){
            const errors = resp.responseJSON.errors;
            if( !errors || !errors.hasErr ){
                alert('Une erreur servenu ! voir la console ');
                console.log(resp);
            }else{
                if( errors.username )
                    DisplayError( "#EU_username", errors.username);
                if( errors.email )
                    DisplayError( "#EU_email", errors.email);
                if( errors.role )
                    DisplayError( "#EU_role", errors.role);
                if( errors.password )
                    DisplayError( "#EU_pwd1", errors.password);
            }
            $('.notSubmittedE').removeClass('d-none');
            $('.SubmittedE').addClass('d-none');
        }
    });
}
/** End : user edit modal */


/** Start : user Delete modal */

const DeleteUserModal = document.getElementById('DeleteUserModal')
DeleteUserModal.addEventListener('hidden.bs.modal', function (event) {
    $(DeleteUserModal).find('.modal-body').find('input').val('');
    $($(DeleteUserModal).find('option')[0]).removeAttr('selected').attr('selected',true);
    $('.userDeleteBody').removeClass('d-none');
    $('.DU_success').addClass('d-none');
    $('.userDeleteBody .putusername').text("");
    const deleteBtn = $('#DeleteUserModal .modal-footer').find('button')[0];
    $(deleteBtn).data( 'userid', null);
    $('.notSubmittedD').removeClass('d-none');
    $('.SubmittedD').addClass('d-none');
    $('.err').addClass('d-none');
});

function delete_user(id){
    const deleteModal = new bootstrap.Modal(document.getElementById('DeleteUserModal'));
    const delBtn = $('#DeleteUserModal .modal-footer').find('button')[0];
    $(delBtn).data( 'userid', id);
    const user = usersList.find( user=> user.id == id );
    $('.userDeleteBody .putusername').text(user.username);
    deleteModal.show();
}

function destroyUser(){
    const delBtn = $('#DeleteUserModal .modal-footer').find('button')[0];
    const userid=  parseInt($(delBtn).data( 'userid'));
    if( !userid || !Number.isInteger(userid) ){
        DisplayError( '#DU_id', " Une erreur est servenue, Veuillez actualiser la page ! ");    
        return;
    }
    $.ajax({ // $.post(...)  : met l'objet en paires dans un corps form-data, alors qu'il est impossible d'envoyer un objet dans un objet !!
        url: '/api/users/'+userid,
        type: 'DELETE',
        dataType: 'json',
        //async: false,
        success: function(resp) {
            $('.userDeleteBody').addClass('d-none');
            $('.DU_success').removeClass('d-none');
            usersList.map( (elem,ind)=>{
                if( elem.id == resp.id){
                    usersList.splice( ind, 1);
                }
            } );
            $('.notSubmittedD').addClass('d-none');
            $('.SubmittedD').removeClass('d-none');
            RenderUsersList( usersList ); // actualiser les enregistrements dans le tableau
            render_pagination(); // actualiser le nombre et la vue de pagination
        },
        error : function(resp){
            console.log(resp);
            console.log(resp.errors);
            const errors = resp.responseJSON.errors;
            if( !errors || !errors.hasErr ){
                alert('Une erreur servenu ! voir la console ');
                console.log(resp);
            }else{
                DisplayError( '#DU_id', " Une erreur est servenue, Veuillez actualiser la page ! "); 
            }
            $('.notSubmittedD').removeClass('d-none');
            $('.SubmittedD').addClass('d-none');
        }
    });
}

/** End : user Delete modal */

$( document ).ready(()=>{
    fetch_users();  // ready ? then start Firewoks :D
});
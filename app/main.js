
// Init new camera instance on the player node
const camera = new Camera( $('#player')[0] );

// Main app logic
const _init = () => {

  // Init new message instance
  const messages = new Message();

  // Notify user of connection errors
  window.addEventListener('messages_error', () => {
    toastr.error('Messages could not be retreived.<br>Will keep trying.', 'Network Connection Error');
  });

  // Listen for existing messages from server
  window.addEventListener('messages_ready', () => {

    // Remove the loader
    $('#loader').remove();

    // Check some messages exist
    if(messages.all.length == 0) toastr.info('Add the first message.', 'No Messages');

    // Empty out existing messages if this update is from a reconnection
    $('#messages').empty();

    // Loop and render all messages (reverse as we're prepending)
    messages.all.reverse().forEach( renderMessage );
  });

  // Listen for new message event
  window.addEventListener('new_message', (e) => {
    renderMessage( e.detail );
  });

  // Switch on camera in viewfinder
  $('#viewfinder').on("show.bs.modal", () => {
    camera.switch_on();
  });

  // Switch off camera in viewfinder
  $('#viewfinder').on("hidden.bs.modal", () => {
    camera.switch_off();
  });

  // Take photo
  $('#shutter').on("click", () => {

    let photo = camera.take_photo();

    // Show photo preview in camera button
    $('#camera').css('background-image', `url(${photo})`).addClass('withphoto');
  });

  // Submit message
  $('#send').on("click", () => {

    // Get caption text
    let caption = $('#caption').val();

    // Check message is ok
    if ( !camera.photo || !caption ) {

      // Show notification and return
      toastr.warning('Photo & Caption Required.', 'Incomplete Message');
      return;
    }

    // Add new message
    let message = messages.add( camera.photo, caption );

    // Render new message in feed
    renderMessage( message );

    // Reset caption & photo on success
    $('#caption').val('');
    $('#camera').css('background-image', '').removeClass('withphoto');
    camera.photo = null;

  });
}

// Create new message element
const renderMessage = (message) => {

  // Message HTML
  let msgHTML = `
    <div style="display:none;" class="row message bg-light mb-2 rounded shadow">
      <div class="col-2 p-1">
        <img src="${message.photo}" class="photo w-100 rounded">
      </div>
      <div class="col-10 p-1">${message.caption}</div>
    </div>`;

    // Prepend to #messages
    $(msgHTML).prependTo('#messages').show(500)

      // Bind a click handler on new img element to show in modal
      .find('img').on("click", showPhoto);
};

// Show message photo in modal
const showPhoto = (e) => {

  // Get photo src
  let photoSrc = $(e.currentTarget).attr('src');

  // Set to and show photoframe modal
  $('#photoframe img').attr('src', photoSrc);
  $('#photoframe').modal('show');
};

// support for CST web page
const email = 'comp.sci.tutor.1@gmail.com';

// global hook
cst1 = {};

cst1.init = () => {
  // do stuff
  console.log(`Email is ${email}`);

  initCurrent();
  addTabClickHandlers();
  setupEmail();
};


function initCurrent() {
  $('#tab-profile').addClass('current');
  $('#profile').addClass('current');
}

function addTabClickHandlers() {
  let tabs = $( '.tabs a' );
  tabs.on('click', (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(`>> clicked ${id}`);
    selectTab(id);
  });
}

function selectTab(which) {
  let tabs = $( '.tabs a' );
  tabs.removeClass('current');
  $( '#' + which ).addClass('current');

  let paneId = which.replace('tab-', '');
  console.log(`> selecting ${paneId}`);

  let panes = $('.pane');
  panes.removeClass('current');
  $( '#' + paneId ).addClass('current');
}

function setupEmail() {
  let subj = `Tutoring+Inquiry`;
  $('#email').append(`<p>Contact me by email:
   <a href="mailto:${email}?subject=${subj}" target="_blank">${email}</a></p>`);

   $('#phone').append(`<p>Or phone me at: <i>916.740.5132</i></p>`);
};

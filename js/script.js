/*
    Script for supporting a tabbed information page.

    Author: Simon Hunt
    Date  : August 2018
 */

// global hook
cst1 = {
  data: {
    tabs: {},
    tabList: [],
  }
};

const pp = x => JSON.stringify(x, null, 2);

cst1.init = () => {
  // console.log(`>> data is ${pp(cst1.data)}`);
  processTabs();
  addTabClickHandlers();
};

cst1.linkTab = (title, popfn) => {
  const d = cst1.data;
  d.tabs[title] = { title, popfn };
  d.tabList.push(title);
}

cst1.nb = (str, count) => {
  let c = count || 1;
  return str.replace(/ /g, '&nbsp;'.repeat(c));
};

cst1.dates = (d1, d2) => `${cst1.nb(d1)}&mdash;${cst1.nb(d2)}`;


function processTabs() {
  const d = cst1.data;
  d.tabList.forEach((tkey, idx) => {
    console.log(`>> Processing tab ${idx}: ${d.tabs[tkey].title}`);
    insertTab(d.tabs[tkey], idx === 0);
  });
}

function insertTab(t, current) {
  const $container = $('#tabbed-content');
  const $tabs = $container.find('.tabs');
  const $panes = $container.find('.panes');

  // add the tab
  const ttl = t.title;
  const id = `tab-${ttl}`;
  const href = `#${ttl}`;

  const a = $(`<a id="${id}" href="${href}">${ttl}</a>`);
  if (current) {
    a.addClass('current');
  }
  const li = $('<li>').append(a);
  $tabs.append(li);

  // add the pane
  const paneContent = $(`<div class="pane-content"></div>`);
  const paneDiv = $(`<div id="${ttl}" class="pane"></div>`);
  if (current) {
    paneDiv.addClass('current');
  }
  paneDiv.append(paneContent);
  $panes.append(paneDiv);

  // populate the pane
  t.popfn(paneContent);
}

function addTabClickHandlers() {
  let tabs = $( '.tabs a' );
  tabs.on('click', (e) => {
    e.preventDefault();
    selectTab(e.target.id);
  });
}

function selectTab(which) {
  let tabs = $( '.tabs a' );
  tabs.removeClass('current');
  $( '#' + which ).addClass('current');
  let paneId = which.replace('tab-', '');
  let panes = $('.pane');
  panes.removeClass('current');
  $( '#' + paneId ).addClass('current');
}

/* =========================================================================
   Practice archive — "100 Days of Code" and "Hands-On" build logs.

   Every entry is a small project that was actually built and deployed
   (Cloudflare Workers / Pages, Netlify). Rendered into #archive-grid by the
   controller at the bottom of this file: search, series + category
   filtering, and paged "show more" so we never mount all 157 nodes at once.

   Row shape: [ title, url, seriesIndex, category ]
   ========================================================================= */
(function () {
  'use strict';

  var SERIES = ["100 Days of Code", "Hands-On"];

  var CATEGORY = {
    games: 'Game',
    ui:    'UI Component',
    tools: 'Tool',
    sites: 'Website'
  };

  /* eslint-disable */
  var PROJECTS = [
  ["Accessible Web Page", "https://accessible-webpage.netlify.app/", 0, "ui"],
  ["Activity Pokemon", "https://b10d6c90.activity-pokemon.pages.dev/", 0, "games"],
  ["Advanced Counter Component", "https://advanced-counters.netlify.app/", 0, "ui"],
  ["Age calc", "https://age-calc.jrabara101.workers.dev", 0, "tools"],
  ["Age Calculator", "https://age-calculator.jrabara101.workers.dev", 0, "tools"],
  ["AI Powered Product Recommend", "https://ai-product-recommend.pages.dev/", 0, "sites"],
  ["Anagram Checker", "https://anagram-checker.jrabara101.workers.dev/", 0, "tools"],
  ["Analog Clock", "https://analogclock.jrabara101.workers.dev/", 0, "tools"],
  ["Animated Click", "https://clickeranalog.netlify.app/", 0, "ui"],
  ["Animated Click Effect", "https://click-animated.jrabara101.workers.dev/", 0, "ui"],
  ["Apex Fitness", "https://apex-fitness-website.netlify.app/#home", 0, "sites"],
  ["Article", "https://article.jrabara101.workers.dev/", 0, "sites"],
  ["Article Blog Card", "https://blog-website.jrabara101.workers.dev/", 0, "ui"],
  ["Background Color Changer", "https://color-background-changerrr.netlify.app/", 0, "ui"],
  ["BMI Calculator", "https://bmi-calculator.jrabara101.workers.dev", 0, "tools"],
  ["Bookmark", "https://bookmarks-file.netlify.app/", 0, "sites"],
  ["Business Card", "https://business-card.jrabara101.workers.dev/", 0, "ui"],
  ["Button Loading Animation", "https://button-loading.jrabara101.workers.dev/", 0, "ui"],
  ["Calendar Website", "https://calendarliee-website.netlify.app/", 0, "sites"],
  ["Chef Landing", "https://astonishing-arithmetic-1ea077.netlify.app/", 0, "sites"],
  ["Code much Fun", "https://code-much-fun.netlify.app/", 0, "sites"],
  ["Coin flipper", "https://coinflipper.jrabara101.workers.dev/", 0, "games"],
  ["Color Guess", "https://color-guess.jrabara101.workers.dev", 0, "games"],
  ["Color Guess Game", "https://day14-100days-of-code.pages.dev/color-guessing-game/", 0, "games"],
  ["Color Picker", "https://color-picker-app2026.netlify.app/", 0, "ui"],
  ["Complex Gallery", "https://complex-gallery.jrabara101.workers.dev/", 0, "ui"],
  ["Component Library", "https://component-library-website.netlify.app/", 0, "ui"],
  ["Cosmic Runner Rocket", "https://cosmic-rocket-runner.netlify.app/", 0, "games"],
  ["Counter Application", "https://day11-100days-of-code.pages.dev/counter-application/", 0, "tools"],
  ["CSS Animations", "https://css-animations.jrabara101.workers.dev/", 0, "ui"],
  ["Currency Calculator", "https://day13-100days-of-code.pages.dev/currency-calculator/", 0, "tools"],
  ["Dark Toggle", "https://dark-toggle.jrabara101.workers.dev/", 0, "ui"],
  ["Digital Clock", "https://digi-clock3.netlify.app", 0, "tools"],
  ["E-commerce Site", "https://e-commer-ce-site.netlify.app/", 0, "sites"],
  ["Ecommerce Project", "https://ecommerce-project-webs.netlify.app/", 0, "sites"],
  ["Emoji Generator", "https://emoji-trackers.netlify.app/", 0, "ui"],
  ["Expense Tracker", "https://expenser-trackerss.netlify.app/", 0, "tools"],
  ["Fireworks", "https://fireworks.jrabara101.workers.dev", 0, "ui"],
  ["Foundations", "https://founder-foundations.netlify.app/", 0, "sites"],
  ["Github Profile Search", "https://search-github.jrabara101.workers.dev/", 0, "tools"],
  ["Graph", "https://graphhher.netlify.app/", 0, "tools"],
  ["Hex Color Generator", "https://hex-color-generatorrr.netlify.app/", 0, "tools"],
  ["Image Slider", "https://jjk-imageslider.netlify.app/", 0, "ui"],
  ["Inventory Dashboard Website", "https://inventory-dashboard-website.netlify.app/", 0, "sites"],
  ["Ios Calculator", "https://ios-calc.jrabara101.workers.dev/", 0, "tools"],
  ["Iron Ledge", "https://ironledger.jrabara101.workers.dev/", 0, "sites"],
  ["Keyboard Event Game", "https://keyboard-gamer.netlify.app/", 0, "games"],
  ["Landing Page", "https://day12-100days-of-code.pages.dev/", 0, "sites"],
  ["Length Converter", "https://length-converter.jrabara101.workers.dev", 0, "tools"],
  ["Loan Calculator", "https://counter-app.jrabara101.workers.dev", 0, "tools"],
  ["Lorem Ipsum Generator", "https://lorem-ipsum.jrabara101.workers.dev/", 0, "tools"],
  ["Love Calculator", "https://100-days-of-code-5op.pages.dev", 0, "tools"],
  ["Love Generator", "https://love-generator.jrabara101.workers.dev", 0, "tools"],
  ["Luxury States", "https://3c53fe10.luxuryestates.pages.dev/", 0, "sites"],
  ["Magazine", "https://magazines-website.netlify.app/", 0, "sites"],
  ["Memory Game", "https://automation.memory-game-6mt.pages.dev/", 0, "games"],
  ["Minimal Blog Card", "https://day16-100days-of-code.pages.dev/minimal-blog-card/", 0, "ui"],
  ["Modern Login", "https://modern-loggers.jrabara101.workers.dev/", 0, "ui"],
  ["Modular", "https://modular.jrabara101.workers.dev/", 0, "sites"],
  ["Movie Rating", "https://all-about-movies-website.netlify.app/", 0, "sites"],
  ["Navigation Menu", "https://navigation-respons.netlify.app/", 0, "ui"],
  ["Number Guess", "https://number-3d-guesser.netlify.app/", 0, "games"],
  ["Number Guess Game", "https://little-voice-d9dc.jrabara101.workers.dev", 0, "games"],
  ["Palindrome Checker", "https://palindrome-checker-6xs.pages.dev", 0, "tools"],
  ["Password Generator", "https://password-generatorrrs.netlify.app/", 0, "tools"],
  ["Percentage Calculator", "https://precentage-calculator.jrabara101.workers.dev", 0, "tools"],
  ["Popup Box", "https://popup-boxdesign.jrabara101.workers.dev/", 0, "ui"],
  ["Project Architecture", "https://project-archhitecture.netlify.app/", 0, "sites"],
  ["Project Creationss", "https://project-creationsss.netlify.app/", 0, "sites"],
  ["Quiz Game", "https://quizz-game.jrabara101.workers.dev/", 0, "games"],
  ["Random Generator", "https://random-generator-day15.pages.dev/", 0, "tools"],
  ["Random Number Generator", "https://randonm-number.netlify.app/", 0, "tools"],
  ["Random Quote Generator", "https://randomquoted-generated.netlify.app/", 0, "tools"],
  ["Responsive Navigation", "https://responsive-navigations.netlify.app/", 0, "ui"],
  ["Resto project", "https://effervescent-tiramisu-ba0caa.netlify.app/", 0, "sites"],
  ["RGB Calculator", "https://rbg-color.jrabara101.workers.dev", 0, "tools"],
  ["RGB Generator", "https://40c6261c.day11-rgb-color-generator.pages.dev/", 0, "tools"],
  ["Rock Paper Scissor App", "https://rock-paper-scissor.jrabara101.workers.dev", 0, "games"],
  ["Rock Paper Scissors Game", "https://day13-100days-of-code.pages.dev/rock-paper-scissor/", 0, "games"],
  ["Rocket Game", "https://website-rocket.netlify.app/", 0, "games"],
  ["Scoring Pages", "https://b49cb38a.basketball-scoring.pages.dev/", 0, "sites"],
  ["Scribble Playbook", "https://scribble-playbook.netlify.app/", 0, "sites"],
  ["Search Bar Design", "https://searchbardesigner.netlify.app/", 0, "ui"],
  ["Show-Hide Password", "https://hiding-and-showingpassword.netlify.app/", 0, "ui"],
  ["Simple Feature", "https://simple-feature.jrabara101.workers.dev/", 0, "sites"],
  ["Social Media Aggregator", "https://soc-med-aggregator.netlify.app/", 0, "sites"],
  ["Star Rating", "https://star-rating-widget.jrabara101.workers.dev/", 0, "ui"],
  ["Stopwatch", "https://stop-watch.jrabara101.workers.dev", 0, "tools"],
  ["Street Pilot", "https://street-pilot-websites.netlify.app/", 0, "sites"],
  ["Tailwind", "https://helpful-croquembouche-752644.netlify.app/", 0, "sites"],
  ["Terms of Service Agreement", "https://terms-of-service-agreements.netlify.app/", 0, "sites"],
  ["Texting Application", "https://texting-application.netlify.app/", 0, "sites"],
  ["Tic Tac Toe Game", "https://game.tic-tac-toe-game-e0t.pages.dev/", 0, "games"],
  ["Timer App", "https://94de6122.day11-timer-app.pages.dev/", 0, "tools"],
  ["Tip Calculator", "https://tip-calc12.netlify.app", 0, "tools"],
  ["To-do App", "https://day12-100days-of-code.pages.dev/todo-app/", 0, "tools"],
  ["Toast Notification", "https://toaster-notif.jrabara101.workers.dev/", 0, "ui"],
  ["Todo app", "https://todo-app45.netlify.app", 0, "tools"],
  ["Toggle Mobile", "https://toggle-mobile.jrabara101.workers.dev/", 0, "ui"],
  ["Trial", "https://trial.jrabara101.workers.dev/", 0, "sites"],
  ["Unicode Character Page", "https://535a06f2.day11-unicode-character.pages.dev/", 0, "tools"],
  ["Unicode Generator", "https://unicode-generator.netlify.app", 0, "tools"],
  ["Web Form", "https://web-forms.jrabara101.workers.dev/", 0, "ui"],
  ["Wishlist", "https://wishlister.jrabara101.workers.dev/", 0, "sites"],
  ["Word Counter", "https://word-counter.jrabara101.workers.dev", 0, "tools"],
  ["Word Scramble", "https://word-scramblerer-gamer.netlify.app/", 0, "games"],
  ["Word Scramble Game", "https://white-snowflake-25a2.jrabara101.workers.dev", 0, "games"],
  ["Adventure Portfolio", "https://adventure-portfolio.jrabara101.workers.dev/", 1, "sites"],
  ["Apex Hands", "https://04c513e5.apex-hands-on-68.pages.dev/", 1, "sites"],
  ["Architectural Voids", "https://a6fbc9d2.hands-on-42.pages.dev/", 1, "sites"],
  ["Asteroid Game", "https://asteroidgameee.netlify.app/", 1, "games"],
  ["Axion Pay", "https://axiom-pay.pages.dev/", 1, "sites"],
  ["Buggy Calculator", "https://bugggy-calc.netlify.app/", 1, "tools"],
  ["Card Game", "https://830874ad.hands-on-66.pages.dev/", 1, "games"],
  ["Cart Checkbox", "https://checkout-device.pages.dev/", 1, "sites"],
  ["Character Counter", "https://counter-charactersss.netlify.app/", 1, "tools"],
  ["Class Form", "https://classform.jrabara101.workers.dev/", 1, "ui"],
  ["Color Picker", "https://colorpicker.jrabara101.workers.dev/", 1, "ui"],
  ["Community Plans", "https://community-website.jrabara101.workers.dev/", 1, "sites"],
  ["Customizer Car App", "https://lovely-meringue-844b24.netlify.app/", 1, "sites"],
  ["Digital Alterier", "https://digital-alterier-website.netlify.app/", 1, "sites"],
  ["Digital Curator", "https://digital-curator-website.netlify.app/", 1, "sites"],
  ["Dynamic To-do List", "https://dynamictodo-list.jrabara101.workers.dev/", 1, "tools"],
  ["Expanding Cards", "https://0ddd74b0.hands-on-30.pages.dev/", 1, "ui"],
  ["Flora", "https://coruscating-cupcake-b42df5.netlify.app/", 1, "sites"],
  ["Geometry", "https://geometry.jrabara101.workers.dev/", 1, "games"],
  ["Grade Calculator", "https://grade-calculat0rrr.netlify.app/", 1, "tools"],
  ["Hinokami", "https://6c39d37f.hands-on-43.pages.dev/", 1, "sites"],
  ["Horizon Events", "https://horizon-eventsss.netlify.app/", 1, "sites"],
  ["Hover Input App", "https://hover-page.jrabara101.workers.dev/", 1, "ui"],
  ["Hyperion Analytics", "https://285ba05e.hands-on-56.pages.dev/", 1, "sites"],
  ["Joke Website", "https://joke-websitee.netlify.app/", 1, "sites"],
  ["Love Calculator", "https://love-calculator.jrabara101.workers.dev/", 1, "tools"],
  ["Marketing Landing", "https://hands-on-28-marketing.pages.dev/", 1, "sites"],
  ["Notes", "https://notes-applications-app.netlify.app/", 1, "tools"],
  ["Number Guess", "https://numberguess.jrabara101.workers.dev/", 1, "games"],
  ["Otakulens", "https://41b8325d.hands-on-40.pages.dev/", 1, "sites"],
  ["Palindrome Checker", "https://palindrome-checkerss.netlify.app/", 1, "tools"],
  ["Parallax Website", "https://hands-on-29-parallax.pages.dev/", 1, "ui"],
  ["Particle", "https://particle-mission.jrabara101.workers.dev/", 1, "games"],
  ["Persistent Todo-List", "https://persistent-todo-list.netlify.app/", 1, "sites"],
  ["Planning Price", "https://pricingplan.jrabara101.workers.dev/", 1, "sites"],
  ["Posting", "https://712bccea.hands-on-67.pages.dev/", 1, "sites"],
  ["Pricing", "https://checkout-subscription.pages.dev/", 1, "sites"],
  ["Product Filtering", "https://product-filterandsorting.netlify.app/", 1, "tools"],
  ["QR Code Generator", "https://qrcodegenerator.jrabara101.workers.dev/", 1, "tools"],
  ["Quantum Game Arcade", "https://446303ef.hands-on-65.pages.dev/", 1, "games"],
  ["Resume", "https://resume-website-website.netlify.app/", 1, "sites"],
  ["Rocket Ship", "https://rocket-ship.jrabara101.workers.dev/", 1, "games"],
  ["RSVP Link", "https://hands-on-71.pages.dev/", 1, "sites"],
  ["Sandbox", "https://soft-body-sandbox.pages.dev/", 1, "games"],
  ["Stick Run", "https://stickrun.jrabara101.workers.dev/", 1, "games"],
  ["Strategy Website", "https://hands-on-73.pages.dev/", 1, "sites"],
  ["Temperature Converter", "https://temperature-converter.jrabara101.workers.dev/", 1, "tools"],
  ["Visual Code", "https://a649fc3f.hands-on-55.pages.dev/", 1, "sites"],
  ["Whack A Mole", "https://hands-on-37.pages.dev/", 1, "games"],
  ["Wiki Search", "https://hands-on-38.pages.dev/", 1, "tools"],
  ];
  /* eslint-enable */

  var PAGE_SIZE = 24;

  var grid      = document.getElementById('archive-grid');
  var searchBox = document.getElementById('archive-search');
  var moreBtn   = document.getElementById('archive-more');
  var countEl   = document.getElementById('archive-count');
  var emptyEl   = document.getElementById('archive-empty');
  var chips     = document.querySelectorAll('.archive-chip');

  if (!grid) return;

  var state = { series: 'all', category: 'all', query: '', shown: PAGE_SIZE };

  function matches(row) {
    var title = row[0], series = row[2], category = row[3];
    if (state.series !== 'all' && String(series) !== state.series) return false;
    if (state.category !== 'all' && category !== state.category) return false;
    if (state.query && title.toLowerCase().indexOf(state.query) === -1) return false;
    return true;
  }

  function cardFor(row) {
    var title = row[0], url = row[1], series = row[2], category = row[3];

    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className =
      'archive-item group flex flex-col justify-between gap-3 rounded-2xl border ' +
      'border-white/10 bg-white/[0.03] p-4 no-underline transition duration-300 ' +
      'hover:-translate-y-1 hover:border-[#64ffda]/50 hover:bg-white/[0.07] ' +
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#64ffda]';

    var head = document.createElement('div');
    head.className = 'flex items-start justify-between gap-2';

    var name = document.createElement('span');
    name.className = 'text-[#cfe3ff] font-semibold leading-snug group-hover:text-[#64ffda] transition';
    name.textContent = title;

    var arrow = document.createElement('span');
    arrow.className = 'text-[#64ffda] opacity-0 group-hover:opacity-100 transition shrink-0';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';

    head.appendChild(name);
    head.appendChild(arrow);

    var meta = document.createElement('div');
    meta.className = 'flex flex-wrap items-center gap-2';

    var catBadge = document.createElement('span');
    catBadge.className = 'text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-[#64ffda]/10 text-[#64ffda]';
    catBadge.textContent = CATEGORY[category] || category;

    var serBadge = document.createElement('span');
    serBadge.className = 'text-[10px] font-semibold px-2 py-1 rounded-full bg-white/5 text-[#8892b0]';
    serBadge.textContent = SERIES[series];

    meta.appendChild(catBadge);
    meta.appendChild(serBadge);

    a.appendChild(head);
    a.appendChild(meta);
    return a;
  }

  function render() {
    var visible = PROJECTS.filter(matches);
    var slice = visible.slice(0, state.shown);

    grid.innerHTML = '';
    var frag = document.createDocumentFragment();
    slice.forEach(function (row) { frag.appendChild(cardFor(row)); });
    grid.appendChild(frag);

    countEl.textContent = visible.length
      ? 'Showing ' + slice.length + ' of ' + visible.length + ' builds'
      : '';

    emptyEl.classList.toggle('hidden', visible.length !== 0);
    moreBtn.classList.toggle('hidden', slice.length >= visible.length);
    moreBtn.textContent = 'Show ' +
      Math.min(PAGE_SIZE, visible.length - slice.length) + ' more';
  }

  function resetPaging() { state.shown = PAGE_SIZE; }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.getAttribute('data-group');
      var value = chip.getAttribute('data-value');

      document.querySelectorAll('.archive-chip[data-group="' + group + '"]').forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('bg-gradient-to-r', on);
        c.classList.toggle('from-[#64ffda]', on);
        c.classList.toggle('to-[#298dff]', on);
        c.classList.toggle('text-[#0a192f]', on);
        c.classList.toggle('bg-white/10', !on);
        c.classList.toggle('text-white', !on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      state[group] = value;
      resetPaging();
      render();
    });
  });

  var debounce;
  searchBox.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(function () {
      state.query = searchBox.value.trim().toLowerCase();
      resetPaging();
      render();
    }, 150);
  });

  moreBtn.addEventListener('click', function () {
    state.shown += PAGE_SIZE;
    render();
  });

  /* Headline stats, derived so they can never drift from the data. */
  function setStat(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  setStat('archive-stat-total', PROJECTS.length);
  setStat('archive-stat-days', PROJECTS.filter(function (r) { return r[2] === 0; }).length);
  setStat('archive-stat-hands', PROJECTS.filter(function (r) { return r[2] === 1; }).length);

  render();
})();

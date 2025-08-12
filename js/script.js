
// Wait for DOM to be ready of html before start 
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOVIE DATA ==========
    const movieData = [
        {
            id: 'avengers',
            image: '../images/Rectangle 3 (2).svg',
            title: 'Aquaman',
            imdb: 'IMDb 7.0 (350,000)',
            year: '2018',
            duration: '2 hours 23 minutes',
            genre: 'Action/Adventure',
            description: 'Arthur Curry, the heir to the underwater kingdom of Atlantis, must step forward to lead his people and protect both land and sea.'
        },
        {
            id: 'joker',
            image: '../images/Rectangle 4.svg',
            title: 'Avengers: Endgame',
            imdb: 'IMDb 8.4 (985,423)',
            year: '2019',
            duration: '3 hours 1 minute',
            genre: 'Action/Sci-fi',
            description: 'After the devastating events of Infinity War, the Avengers assemble to reverse Thanos\' actions and restore balance to the universe.'
        },
        {
            id: 'dune',
            image: '../images/Rectangle 5.svg',
            title: 'Avengers: Infinity War',
            imdb: 'IMDb 8.5 (1,000,000)',
            year: '2018',
            duration: '2 hours 29 minutes',
            genre: 'Action/Sci-fi',
            description: 'The Avengers and their allies must stop the powerful Thanos from collecting all the Infinity Stones and wiping out half of all life in the universe.'
        },
        {
            id: 'batman',
            image: '../images/Rectangle 7.svg',
            title: 'Spider-Man: Homecoming',
            imdb: 'IMDb 7.4 (350,000)',
            year: '2017',
            duration: '2 hours 13 minutes',
            genre: 'Action/Adventure',
            description: 'Peter Parker balances his life as a high school student and Spider-Man while facing the Vulture, a new villain threatening New York City.'
        },
        {
            id: 'blackwidow',
            image: '../images/Rectangle 8.svg',
            title: 'X-Men: Apocalypse',
            imdb: 'IMDb 6.9 (250,000)',
            year: '2016',
            duration: '2 hours 24 minutes',
            genre: 'Action/Sci-fi',
            description: 'The ancient mutant Apocalypse awakens and plans to destroy the world, forcing the X-Men to unite and stop him once and for all.'
        },
        {
            id: 'spiderman',
            image: '../images/Rectangle 9.svg',
            title: 'X-Men: The Last Stand',
            imdb: 'IMDb 6.7 (280,000)',
            year: '2006',
            duration: '1 hour 44 minutes',
            genre: 'Action/Sci-fi',
            description: 'The discovery of a cure for mutation divides the mutant community and leads to a war between humans and mutants.'
        }
    ];

    // ========== DOM ELEMENTS Html with Js ==========
    const carouselTrack = document.getElementById('carouselTrack'); //poster slider 
    const prevBtn = document.getElementById('prevBtn'); //prev btn
    const nextBtn = document.getElementById('nextBtn');//next btn 
    const body = document.body;
    
    // Movied section elements for updating movie info
    const movieTitle = document.getElementById('movie-title');
    const imdbRating = document.getElementById('imdb-rating');
    const movieYear = document.getElementById('movie-year');
    const movieDuration = document.getElementById('movie-duration');
    const movieGenre = document.getElementById('movie-genre');
    const movieDescription = document.getElementById('movie-description'); // for description see more see less 
    const seeMoreBtn = document.getElementById('see-more-btn');

    // ========== CAROUSEL STATE for slider ==========
    let isAnimating = false; // Prevent rapid button clicks during animation // for slider
    const posterWidth = 165; // Width of poster + gap (150px + 15px gap)
    const totalPosters = movieData.length;

    /**
     *DESCRIPTION
     * Truncates description if it's longer than 8 words
     */
    function truncateDescription(description) {
        const words = description.split(' ');
        if (words.length > 8) {
            const truncated = words.slice(0, 8).join(' ') + '... ';
            return {
                text: truncated,
                isTruncated: true,
                fullText: description
            };
        }
        return {
            text: description,
            isTruncated: false,
            fullText: description
        };
    }

    /**
     * HANDLE SEE MORE BUTTON CLICK
     * Toggles between truncated and full description
     */
    function handleSeeMoreClick() {
        if (isDescriptionTruncated) {
            // Show full description with "See less"
            movieDescription.innerHTML = `${fullDescription} <span class="see-more-inline" style="color: #ffcc00; cursor: pointer; text-decoration: underline;">See less</span>`;
            isDescriptionTruncated = false;
            
            // Add click event to the inline "See less"
            const seeLessSpan = movieDescription.querySelector('.see-more-inline');
            seeLessSpan.addEventListener('click', handleSeeMoreClick);
        } else {
            // Show truncated description with "See more"
            const truncated = truncateDescription(fullDescription);
            movieDescription.innerHTML = `${truncated.text}<span class="see-more-inline" style="color: #ffcc00; cursor: pointer; text-decoration: underline;">See more</span>`;
            isDescriptionTruncated = true;
            
            // Add click event to the inline "See more"
            const seeMoreSpan = movieDescription.querySelector('.see-more-inline');
            seeMoreSpan.addEventListener('click', handleSeeMoreClick);
        }
    }




    // ininity slider (carousel)

    function setupInfiniteCarousel() {
        // Clear any existing content
        carouselTrack.innerHTML = '';        
        const allPosterElements = []; // all posters clones and orginal 
        
        // Add clones of all posters at the beginning (for leftward scrolling) ! (first clone)
        movieData.forEach((movie, index) => {
            const clone = createPosterElement(movie, index, true, 'start');
            allPosterElements.push(clone);
            carouselTrack.appendChild(clone);
        });
        
        // Add original posters in the middle
        movieData.forEach((movie, index) => {
            const original = createPosterElement(movie, index, false);
            allPosterElements.push(original);
            carouselTrack.appendChild(original);
        });
        
        //Add clones of all posters at the end (for rightward scrolling)
        movieData.forEach((movie, index) => {
            const clone = createPosterElement(movie, index, true, 'end');
            allPosterElements.push(clone);
            carouselTrack.appendChild(clone);
        });
        
        allPosters = allPosterElements;
        
        // // Skip the first set of clones by moving left by (totalPosters * posterWidth)
        // const initialOffset = -totalPosters * posterWidth;
        // carouselTrack.style.transform = `translateX(${initialOffset}px)`;
        

        currentIndex = 1; // which poster will show first 
        updateMovieInfo(currentIndex); // update info 
       // highlightActivePoster(); // hightlight the poster 
        
        // console.log('Infinite carousel setup complete');
        // console.log(`Total posters: ${allPosters.length} (${totalPosters} clones + ${totalPosters} originals + ${totalPosters} clones)`);
    }



    

    /**
     * Creates a poster image element with all necessary properties
     */
    function createPosterElement(movie, originalIndex, isClone, clonePosition = null) {
        const img = document.createElement('img');//create img 
        img.src = movie.image;
        img.alt = movie.title; // if its not showing 
        img.dataset.originalIndex = originalIndex; //  original movie data
        img.dataset.isClone = isClone;
        if (clonePosition) {
            img.dataset.clonePosition = clonePosition;
        }
        
        // Add event listeners
        img.addEventListener('click', () => handlePosterClick(originalIndex)); //when click update data
        img.addEventListener('mouseenter', handlePosterHover); // when hover do effect 
        img.addEventListener('mouseleave', handlePosterLeave); // when leave remove effect 
        img.addEventListener('dragstart', (e) => e.preventDefault()); // Prevent dragging 
        
        return img;
    }

    /**
     * MOVE TO NEXT POSTER
     * Slides the carousel left to show the next poster
     * When reaching the end clones, invisibly jumps back to originals
     */

    // >> btn next when done with clone go to the orginal one 
    function moveNext() {
        if (isAnimating) return; // for not click multiple times 

        isAnimating = true; //start moving 
        
        // Move to the next position
        currentIndex = (currentIndex + 1) % totalPosters // add + 1 when all =0 
        
        // Calculate the current transform value
        const currentTransform = getCurrentTransform(); // to know the location 
        const newTransform = currentTransform - posterWidth;
        
        // Apply the slide animation
        carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        carouselTrack.style.transform = `translateX(${newTransform}px)`;
        
        // After animation completes, check if we need to jump back to originals
        setTimeout(() => {
            //clone end cal 
            const expectedEndPosition = -totalPosters * posterWidth - totalPosters * posterWidth;
            
            // If we've moved into the end clones, jump back to the beginning of originals
          
            if (newTransform <= expectedEndPosition) {
                console.log('Reached end clones, jumping to start of originals');
                
                // Disable transition for invisible jump
                // carouselTrack.style.transition = 'none';
                const jumpPosition = -totalPosters * posterWidth; 
                carouselTrack.style.transform = `translateX(${jumpPosition}px)`; // jump to the orginal 
                
                // Force reflow to ensure the jump happens before re-enabling transition
               // carouselTrack.offsetHeight;
                
                // Re-enable transition for future animations
                carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
            }
            
            updateMovieInfo(currentIndex); // update info 
           // highlightActivePoster(); // hightlight 
            isAnimating = false; // move if this not false then it will just move once 
        }, 650); // Slightly longer than animation duration (time moving)
    }

    /**
     * MOVE TO PREVIOUS POSTER
     * Slides the carousel right to show the previous poster
     * When reaching the start clones, invisibly jumps to the end of originals
     */

    // btn << 
    function movePrev() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Move to the previous position
        currentIndex = (currentIndex - 1 + totalPosters) % totalPosters;
        
        // Calculate the current transform value
        const currentTransform = getCurrentTransform();
        const newTransform = currentTransform + posterWidth;
        
        // Apply the slide animation
        carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
        carouselTrack.style.transform = `translateX(${newTransform}px)`;
        
        // After animation completes, check if we need to jump to the end of originals
        setTimeout(() => {
            const expectedStartPosition = 0;
            
            // If we've moved into the start clones, jump to the end of originals
            if (newTransform >= expectedStartPosition) {
                console.log('Reached start clones, jumping to end of originals');
                
                // Disable transition for invisible jump
                carouselTrack.style.transition = 'none';
                const jumpPosition = -totalPosters * posterWidth - (totalPosters - 1) * posterWidth;
                carouselTrack.style.transform = `translateX(${jumpPosition}px)`;
                
                // Force reflow
                carouselTrack.offsetHeight;
                
                // Re-enable transition
                carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
            }
            
            updateMovieInfo(currentIndex);
            //highlightActivePoster();
            isAnimating = false;
        }, 650);
    }



    /**
     * GET CURRENT TRANSFORM
     * Extracts the current translateX value from the carousel track 
     * *make next and prev works 
     * this to know eactlly poster loction in pixel

     */
    function getCurrentTransform() {
        const transform = carouselTrack.style.transform; // from the css or by js translateX(${newTransform}px
        if (transform && transform.includes('translateX')) { // the eelment move base on translateX 
            const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
            return match ? parseFloat(match[1]) : 0;
        }
        return 0;
    }

    /**
     * HANDLE POSTER CLICK
     * Updates the Movied section with the clicked movie's information
     */
    function handlePosterClick(originalIndex) {
        currentIndex = originalIndex; 
        updateMovieInfo(currentIndex);
        //highlightActivePoster();
    }

    /**
     * UPDATE MOVIE INFO
     * Updates the hero section with movie details
     * Handles description truncation and "See more" functionality
     */
    function updateMovieInfo(index) {
        const movie = movieData[index];
        
        // Update background base on poster  image from the array 
        body.style.background = `
            linear-gradient(
                to left, 
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.6) 70%,
                rgba(0, 0, 0, 0.9) 100%
            ),
            url("${movie.image}") no-repeat center center 
        `;
        body.style.backgroundSize = 'cover';
        
        // Update text information
        movieTitle.innerHTML = formatTitle(movie.title);
        imdbRating.textContent = movie.imdb;
        movieYear.textContent = `• ${movie.year}`;
        movieDuration.textContent = movie.duration;
        movieGenre.textContent = `• ${movie.genre}`;
        
        // Handle description truncation
        const descriptionResult = truncateDescription(movie.description);
        fullDescription = descriptionResult.fullText;
        
        if (descriptionResult.isTruncated) {
            // Show truncated description with inline "See more"
            movieDescription.innerHTML = `${descriptionResult.text}<span class="see-more-inline" style="color: #ffcc00; cursor: pointer; text-decoration: underline;">See more</span>`;
            isDescriptionTruncated = true;
            
            // Add click event to the inline "See more"
            const seeMoreSpan = movieDescription.querySelector('.see-more-inline');
            seeMoreSpan.addEventListener('click', handleSeeMoreClick);
        } else {
            // Show full description
            movieDescription.textContent = descriptionResult.text;
            isDescriptionTruncated = false;
        }
        
        // Hide the separate button since we're using inline text
        seeMoreBtn.style.display = 'none';
    }

    /**
     * FORMAT TITLE
     * Adds line breaks for long movie titles
     */
    function formatTitle(title) {
        if (title.length > 15) {
            const words = title.split(' ');
            const midpoint = Math.floor(words.length / 2);
            const firstHalf = words.slice(0, midpoint).join(' ');
            const secondHalf = words.slice(midpoint).join(' ');
            return `${firstHalf} <br> ${secondHalf}`;
        }
        return title;
    }

    /**
     * HIGHLIGHT ACTIVE POSTER
     * Adds visual emphasis to the currently selected movie poster (hightlight)
     */
    // function highlightActivePoster() {
    //     // Remove active class from all posters
    //     allPosters.forEach(poster => {
    //         poster.classList.remove('active');
    //     });
        
    //     // Add active class to all posters representing the current movie
    //     allPosters.forEach(poster => {
    //         if (parseInt(poster.dataset.originalIndex) === currentIndex) {
    //             poster.classList.add('active');
    //         }
    //     });
    // }

    /**
     * POSTER HOVER EFFECTS
     * Add dimming effect to other posters when hovering over one
     */
    function handlePosterHover() {
        carouselTrack.classList.add('dimmed');
    }

    function handlePosterLeave() {
        carouselTrack.classList.remove('dimmed');
    }

    // ========== EVENT LISTENERS ==========
    
    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        movePrev();
        prevBtn.blur(); // Remove focus to prevent outline
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNext();
        nextBtn.blur(); // Remove focus to prevent outline
    });

    // See More button functionality
    seeMoreBtn.addEventListener('click', handleSeeMoreClick);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            movePrev();
        } else if (e.key === 'ArrowRight') {
            moveNext();
        }
    });

    // Prevent focus outlines on buttons
    prevBtn.addEventListener('focus', () => prevBtn.blur());
    nextBtn.addEventListener('focus', () => nextBtn.blur());

    // ========== INITIALIZE CAROUSEL ==========
    setupInfiniteCarousel();// when slider end it keep moving whenver you click Carousel

    // just messages 
    console.log('Infinite Movie Carousel initialized successfully!');
    console.log('Features enabled:');
    console.log('- Infinite scrolling in both directions');
    console.log('- IMDb ratings with black background and yellow text');
    console.log('- Description truncation with "See more" functionality');
    console.log('- Smooth animations and hover effects');
});
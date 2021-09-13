// currentTime is in seconds; this function converts it to properly formatted time
export default function secondsToTime(s) {
	let h = Math.floor(s / (60 * 60)),
		dm = s % (60 * 60),
		m = Math.floor(dm / 60),
		ds = dm % 60,
		secs = Math.ceil(ds);

	let fulltime;	
	// this fixes the crossover from 59 seconds to 1 minute
	if (secs === 60) {
		secs = 0;
		m = m + 1;
	}

	if (secs < 10) {
		secs = "0" + secs;
	}

	// this fixes the crossover from 59 minutes to 1 hour
	if (m === 60) {
		m = 0;
		h = h + 1;
	}

	if (m < 10) {
		m = "0" + m;
	}

	if (h === 0) {
		fulltime = m + ":" + secs;
	} else {
		fulltime = h + ":" + m + ":" + secs;
	}

	return fulltime;  
}
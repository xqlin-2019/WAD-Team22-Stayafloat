function get_Week() {

    var today = new Date();
    var curr_date = new Date((today.getMonth()+1)+'/'+today.getDate()+'/' + today.getFullYear());
    //console.log(typeof(curr_date));
    var start_date = new Date("08/17/2020");
    //console.log(typeof(start_date));

    var diff_in_time = curr_date.getTime() - start_date.getTime();
    var diff_in_days = diff_in_time / (1000 * 3600 * 24);
    //console.log(diff_in_days);

    var week = 0;
    var progressvalue = "0%"
    if(diff_in_days < 5){
        week = 1;
        progressvalue = "6.5%";
    }
    else{
        week = Math.ceil(diff_in_days/7);
        //console.log(week);
        percent = week * 6.5;
        //console.log(typeof(percent));
        progress_str = percent.toString();
        //console.log(progress_str);
        progressvalue = progress_str + "%";
    }



    var progressdiv = document.getElementById("progressbar");
    progressdiv.innerHTML = "";
    prog_str = ''

    prog_str += ` 
    <h1 style="text-align: center; ">Week ${week}</h1>
    <div class="progress p_bar" style="height: 25px;" >
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" 
        style="width: ${progressvalue} " aria-valuenow="${week}" aria-valuemin="1" aria-valuemax="15">${progressvalue}</div>
    </div>    `

    document.getElementById('progressbar').innerHTML = prog_str;
    //console.log(progressdiv);


}

function countdown(date){
    //console.log(date);
    var countdownDate = new Date(date).getTime();
    var today = new Date().getTime();
    //console.log(countdownDate);


    var distance = countdownDate - today;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //console.log(days);
    
    return days;

}

function display_milestone(){
    var request = new XMLHttpRequest(); // Prep to make an API call
    var str = "";
    request.onreadystatechange = function() {
        if( this.readyState == 4 && this.status == 200 ) {
            var obj = JSON.parse(this.responseText); // JS JSON object
            //console.log(obj)
            milestones_arr = obj.milestones
            if (obj.retrieve_status == "successful"){
                milestones_arr.sort(function(a,b){return new Date(a.date) - new Date(b.date);});
                var count = 0
                for(var i = 0; i < milestones_arr.length; i++){
                    //console.log(milestone);
                    // console.log(milestone.date);
                    if (count == 3) {
                        document.getElementById("milestone_cards").innerHTML = str;
                        return};

                    var date = milestones_arr[i].date;
                    var count_down = countdown(date);
                    var description = milestones_arr[i].description;
                    //console.log(count_down);

                    str+= `
                        <div class="col-xl-4" >
                            <div class="card" style="margin-bottom:10px" >
                                <div class="card-body" style="padding:0; ">
                                    <h1 class="card-title text-uppercase  text-white" style=" background-color: #102B72; padding:20px; margin-top:0;">${count_down} DAYS LEFT</h1>
                                    <p class="card-text" style="color:black; font-size:large">${description}</p>
                                </div>
                            </div>
                        </div>`;

                    console.log(milestones_arr[count].date);
                    count +=1;
                }

                document.getElementById("milestone_cards").innerHTML = str;
                //console.log(str)
            }
            
        }
    }

    var email = sessionStorage.getItem('email');

    // console.log(description, date);
    var url = `./php/userAuth.php?action=getMilestones&email=${email}`;
    request.open("GET", url, true); // synchronous
    request.send();
}
Pts.namespace(window); 


rule = (rule_num, num_squares) => {
    //1. Initialize first row
    cell_state = new Array(num_squares*num_squares).fill(false);
    cell_state[num_squares/2] = true;
    
    //2. Run Rule 0
    for(i=0;i<num_squares*num_squares;i++){
        if(i>num_squares-1){
            i_prev = i-(num_squares+1);
            i_curr = i-(num_squares);
            i_next = i-(num_squares-1);
            if(rule_num==1) fill = !(cell_state[i_prev] | cell_state[i_curr] | cell_state[i_next]);
            if(rule_num==2) fill = !(cell_state[i_prev]) & !(cell_state[i_curr]) & cell_state[i_next];
            if(rule_num==3) fill = !(cell_state[i_prev] | cell_state[i_curr]);
            cell_state[i] = fill;
            fill = fill?"#123":"#fff"
        }
    }
    return cell_state;
}

addrules = () => {
    var rules = $("#ca-dd-sel");
    for(i=1;i<256;i++){
        opt = "<option>Rule "+i+"</option>";
        rules.append(opt);
    }
    
    rules.on('change', function() {
        $("#ca-rule").html("");
        createSpace(rules.val().split(" ")[1]);
    })
}

createSpace = (rule_num) => {
    var space = new CanvasSpace("#ca-rule").setup({retina: true,bgcolor: 'floralwhite',resize:false});
    var form = space.getForm();
    var num_squares = 100;
    var cells = [];
    var cell_state = [];
    space.add({
        start: () => {
            cells = Create.gridPts(space.innerBound, num_squares, num_squares);
            cell_state = rule(rule_num, num_squares);
        },
        animate: (time, ftime) => {
            cells.forEach((c,i) => {
                form.strokeOnly("#123", 0.5).fill(cell_state[i]?"#4e5054":"#fff").square(c, 3); 
            });
        }
    });
    space.playOnce(0);
}
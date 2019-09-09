$(document).ready(function () {
    var todo = new Todo();
})

class Todo{
    constructor() {
       this.loadTable();
       this.InitEvents();
    }
    InitEvents()
    {
        $('.submit-text').on('click', this.AddNewTask.bind(this));

    }
    AddNewTask()
    {
        let me = this;
        let demo = {task:$('.input-text').val() };
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/add',
            data:JSON.stringify(demo),
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success: function (res) {
                me.loadTable();
            },
            error: function (res) {
                alert('He thong dang loi ' + res.message)
            }
        })

    }
    getData()
    {
        let fakeData=[];

        $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/api/todolist',
            async:false,
            dataType:'json',
            success: function (res) {
               fakeData = res;
            },
            error: function (res) {
                alert('He thong dang loi ' + res.message)
            }
        });

        return fakeData;

    }
    loadTable()
    {

        const data = this.getData();

        $.each(data, function (index, item) { //hoi
            var rowhtml =
                '<tr>'
                + '<td class="uncheck">' + '</td>'
                + '<td>' + item.task + '</td>'
                + '/<tr>';
            $('.main-table tbody').append(rowhtml);
        });

    }
}





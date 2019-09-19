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
        $('.main-table tbody').on('click', 'tr .uncheck', this.TickRow);
        $('.main-table tbody').on('click', 'tr', { "jsObject": this }, this.RowOnClick);
        $('.edit').on('click', this.OpenDialogEdit);
        $('.add-new').on('click', this.OpenDialogAdd);
        $('.submit-text-add').on('click', this.AddNewTask.bind(this));
        $('.submit-text-edit').on('click', this.EditTask.bind(this))
        $('.delete').on('click', this.DelTask.bind(this));

    }
    DelTask()
    {
        let me = this;
        let todoID = me.GetRowID();
        $.ajax({
            method: 'DELETE',
            url: 'http://localhost:8080/api/delete/'+ todoID,
            async:false,
            success: function (res) {
                if(res.success)
                {
                    me.loadTable();
                    debugger
                }
                alert('delete successfully');

            },
            error: function (res) {
                alert('He thong dang loi ' + res.message)
            }
        })
    }
    RowOnClick(event) {
        let me = event.data["jsObject"];
        $('button').removeAttr('disabled');

        $('tr').removeClass('select');

        $(this).addClass('select');

        me.LoadDetailTable();

    }
    LoadDetailTable() {
        var me = this;
        var refid = me.GetRowID();
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/api/todo/' + refid,
            async:false,
            success: function (res) {
                $('.input-text-edit').append("<input value=\""+res.task+"\">");
            },
            error: function (res) {
                alert('he thong dang loi')
            }
        })
    }
    TickRow() {
        $(this).addClass('tick');
    }
    GetRowID() {
        let rowid = $('.select,.tick').data("todoID");
        return rowid;
    }
    OpenDialogAdd() {

        $("#dialog-add").dialog({
            modal: true,
            height: 300,
            width: 400
        });

    }
    CloseDialogEdit()
    {
        $("#dialog-add").close();
    }
    OpenDialogEdit()
    {
        $("#dialog-edit").dialog({
            modal: true,
            height: 300,
            width: 400
        });
    }
    EditTask()
    {
        let me = this;
        let demo = {task:$('.input-text-edit').val() };
        let todoID = me.GetRowID();

        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8080/api/edit/'+ todoID,
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
    AddNewTask()
    {
        let me = this;
        let demo = {task:$('.input-text-add').val() };
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/api/add',
            data:JSON.stringify(demo),
            dataType:'json',
            contentType: 'application/json; charset=utf-8',
            success: function (res) {
                alert("add new successful");
                if(res.success)
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
                $('<tr>'
                + '<td class="uncheck">' + '</td>'
                + '<td>' + item.task + '</td>'
                + '/<tr>').data("todoID", item.id);
            $('.main-table tbody').append(rowhtml);
        });

    }
}





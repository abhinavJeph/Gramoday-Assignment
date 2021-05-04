{
  //   Method to submit the form data for new post using AJAX
  let createPost = function () {
    let newReportFrom = $("#new-report-form");
    const reportDetails = {
      newReportFrom,
      reportID: "",
    };
    newReportFrom.submit(function (e) {
      e.preventDefault();
      console.log("Balllelelelele");
      //   $.ajax({
      //     type: "post",
      //     url: "/reports",
      //     data: reportDetails.serialize(),
      //     success: function (data) {
      //       console.log(data);
      //       // let newPost = newPostDom(data.data.post);
      //       // $("#posts-list-container>ul").prepend(newPost);
      //       // // For flash notification
      //       // callNoty("success", data.message);
      //       // // Deletion by ajax
      //       // deletePost($(" .delete-post-button", newPost));

      //       // // call the create comment class
      //       // new PostComments(data.data.post._id);
      //     },
      //     error: function (err) {
      //       console.log(err.responseText);
      //       // callNoty("error", err.responseText);
      //     },
      //   });
    });
  };

  // method to create a post in DOM
  //     let newPostDom = function (post) {
  //       return $(`<li id="post-${post._id}">
  //                   <p>
  //                       <small>
  //                           <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
  //                       </small>
  //                       ${post.content}
  //                       <br>
  //                       <small>
  //                       ${post.user.name}
  //                       </small>
  //                   </p>
  //                   <div class="post-comments">
  //                           <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
  //                               <input type="text" name="content" placeholder="Type Here to add comment..." required>
  //                               <input type="hidden" name="post" value="${post._id}" >
  //                               <input type="submit" value="Add Comment">
  //                           </form>
  //                       <div class="post-comments-list">
  //                           <ul id="post-comments-${post._id}">
  //                           </ul>
  //                       </div>
  //                   </div>
  //               </li>`);
  //     };
}

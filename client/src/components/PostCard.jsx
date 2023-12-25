import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { postComments } from "../assets/data";

const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1 ">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
        <div className="">
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createdAt ?? "2023-11-18").fromNow()}
          </span>
        </div>
      </div>
      <div className="ml-12">
        {" "}
        <p className=" text-ascent-2">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          <p className="flex gap-2 items-center text-base text-ascent-2 cursor-pointer">
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {reply?.likes?.length} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const onSubmit = async () => {};
  return (
    <form
      className="w-full border-b border-[#66666645] "
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="w-full flex items-center gap-4 py-3">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt={user?.firstName}
          className="md:w-8 md:h-8 w-6 h-6 rounded-full object-cover mt-2"
        />
        <TextInput
          name="Comment"
          styles="w-full rounded-full  ml-2 mr-4 "
          placeholder={replyAt ? `reply @${replyAt}` : `Comment this post`}
          register={register("comment", {
            required: "Comment can't be empty..",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
        <div className="flex items-end justify-end pb-2">
          {loading ? (
            <Loading />
          ) : (
            <CustomButton
              title="submit"
              type="submit"
              containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm mt-3"
            />
          )}
        </div>
      </div>
      {errMsg?.message && (
        <span
          className={`text-sm ${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          }mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}
    </form>
  );
};

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);
  const getComments = async (post_id) => {
    setReplyComments(post_id);
    setComments(postComments);
    setLoading(false);
  };
  const handleLike = () => {};
  // console.log(loading);
  // console.log(comments?.length > 0);
  return (
    <div className="mb-2 bg-primary p-4 rounded-xl">
      <div className="flex gap-3 items-center mb-4">
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName}
            className="w-12 h-10 object-cover rounded-full"
          />
        </Link>
        <div className="w-full flex justify-between md:text-sm text-xs">
          <div className="">
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium  mt-2 text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className=" text-ascent-2">{post?.userId?.location}</span>
          </div>
          <span className=" text-ascent-2 mt-6">
            <span className="text-ascent-2 text-[8px] md:text-[13px]">
              {moment(post?.createdAt ?? "2023-11-18").fromNow()}
            </span>{" "}
          </span>
        </div>
      </div>
      <div className="">
        <p className=" text-ascent-2 text-xs md:text-sm">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}
          {post?.description?.length > 301 &&
            (showAll === post?._id ? (
              <span
                className=" text-blue ml-2 font-medium text-xs md:text-sm cursor-pointer"
                onClick={() => setShowAll(0)}
              >
                Less
              </span>
            ) : (
              <span
                className=" text-blue ml-2 font-medium cursor-pointer"
                onClick={() => setShowAll(post?._id)}
              >
                More
              </span>
            ))}
        </p>
        {post?.image && (
          <img
            src={post?.image}
            alt={post?.image}
            className="w-full mt-2 rounded-lg"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]">
        <p className="flex gap-2 items-center text-xs md:text-sm cursor-pointer">
          {post?.likes?.includes(user?._id) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {post?.likes?.length} Likes
        </p>
        <p
          className="flex gap-2 items-center text-xs md:text-sm cursor-pointer"
          onClick={() => {
            setShowComments(showComments === post?._id ? null : post?._id);
            getComments(post?._id);
          }}
        >
          <BiComment size={20} />
          {post?.comments?.length} Comments
        </p>
        {user?._id === post?.userId?._id && (
          <div
            className="flex gap-1 text-ascent-2 items-center text-base cursor-pointer md:text-sm text-xs"
            onClick={() => deletePost(post?._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div>
        )}
      </div>
      {/* Comments */}
      {showComments === post?._id && (
        <div className="w-full mt-4 border-t border-[#66666645]">
          <CommentForm
            user={user}
            id={post?._id}
            getComments={() => getComments(post?._id)}
          />
          <div className="flex flex-col">
            {loading ? (
              <Loading />
            ) : comments?.length > 0 ? (
              comments.map((comment) => (
                <div
                  className="w-full flex flex-col gap-0 py-1"
                  key={comment?.userId}
                >
                  <div className="flex gap-3 items-center ml-2 md:ml-0 mb-1">
                    <Link to={"/profile/"}>
                      <img
                        src={comment.userId?.profileUrl ?? NoProfile}
                        alt={comment?.userId?.firstName}
                        className="md:w-8 md:h-8 w-6 h-6  rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col mt-1 ">
                      <Link to={"/profile/" + comment?.userId?._id}>
                        <p className="font-[400] text-xs md:text-sm text-ascent-1">
                          {comment?.userId?.firstName}{" "}
                          {comment?.userId?.lastName}
                        </p>
                      </Link>
                      <span className=" text-ascent-2 md:text-[10px] text-[8px]">
                        {moment(comment?.createdAt ?? "2023-11-18").fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className=" text-ascent-2 md:text-[10px] font-bold text-[8px]">
                      {comment?.comment}
                    </p>
                    <div className="mt-2 flex gap-6 text-xs md:text-sm ">
                      <p className="flex gap-2  items-center text-ascent-2 cursor-pointer">
                        {comment?.likes?.includes(user?._id) ? (
                          <BiSolidLike size={20} color="blue" />
                        ) : (
                          <BiLike size={20} />
                        )}
                        {comment?.likes?.length} Likes
                      </p>
                      <span
                        className="text-blue cursor-pointer mt-[2px]"
                        onClick={() => setReplyComments(comment?._id)}
                      >
                        Reply
                      </span>
                    </div>
                    {/* {console.log(replyComments)}
                  {""}
                  {console.log(comment?._id)} */}
                    {replyComments === comment?._id && (
                      <CommentForm
                        user={user}
                        id={comment?._id}
                        replyAt={comment?._id}
                        getComments={() => getComments(post?._id)}
                      />
                    )}
                  </div>
                  {/* reply lists */}
                  <div className="py-2 px-8 mt-8 ">
                    {comment?.replies?.length > 0 && (
                      <p
                        className="text-base text-ascent-1 cursor-pointer"
                        onClick={() =>
                          setShowReply(
                            showReply === comment?.replies?._id
                              ? 0
                              : comment?.replies?._id
                          )
                        }
                      >
                        {/* {console.log(showReply)}
                      {console.log(comment?.replies?._id)} */}
                        show Replies ({comment?.replies.length})
                      </p>
                    )}
                    {showReply === comment?.replies?._id &&
                      comment?.replies?.map((reply) => (
                        <ReplyCard
                          reply={reply}
                          user={user}
                          key={reply?._id}
                          handleLike={() =>
                            handleLike(
                              "/posts/like-comment/" +
                                comment?._id +
                                "/" +
                                reply?._id
                            )
                          }
                        />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="flex text-sm py-4 text-ascent-2 text-center">
                No comments,be First to comment
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;

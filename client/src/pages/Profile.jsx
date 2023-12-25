import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FriendsCard, Loading, ProfileCard, TopBar } from "../components";
import PostCard from "../components/PostCard";
import { posts } from "../assets/data";

export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  //   const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  return (
    <>
      <div className=" home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor  h-screen overflow-hidden">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* left */}
          <div className="hidden w-1/4 lg:w1/4 h-full md:flex flex-col gap-6 overflow-y-auto ">
            <ProfileCard user={user} />
            <div className="block lg:hidden">
              <FriendsCard friends={user?.friends} />
            </div>
          </div>
          {/* Center */}
          <div className="flex-1 h-full  px-4 flex flex-col gap-6 overflow-y-auto">
            {loading ? (
              <Loading />
            ) : posts.length > 0 ? (
              posts.map((post) =>
                posts?.map((post) => (
                  <PostCard
                    key={post?._id}
                    post={post}
                    user={user}
                    deletePost={() => {}}
                    likePost={() => {}}
                  />
                ))
              )
            ) : (
              <div className="flex w-full h-full items-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* Right */}

          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={user?.friends} />
          </div>
        </div>
      </div>{" "}
    </>
  );
}

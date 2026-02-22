import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type Clip = {
    id : Nat;
    title : Text;
    animeName : Text;
    category : Text;
    videoUrl : Text;
    thumbnailUrl : Text;
    uploadDate : Time.Time;
  };

  module Clip {
    public func compareByUploadDateDesc(a : Clip, b : Clip) : Order.Order {
      Int.compare(b.uploadDate, a.uploadDate);
    };
  };

  type ClipRequest = {
    id : Nat;
    title : Text;
    animeName : Text;
    description : Text;
    requesterContact : Text;
    status : Text; // "pending", "approved", "completed", "rejected"
    requestDate : Time.Time;
  };

  module ClipRequest {
    public func compareByRequestDateDesc(a : ClipRequest, b : ClipRequest) : Order.Order {
      Int.compare(b.requestDate, a.requestDate);
    };
  };

  let clips = Map.empty<Nat, Clip>();
  var nextClipId = 0;

  let clipRequests = Map.empty<Nat, ClipRequest>();
  var nextRequestId = 0;

  func addCategory(category : Text) {
    let exists = clips.values().any(
      func(clip) {
        Text.equal(clip.category, category);
      }
    );

    if (not exists) {
      let hint = "Category cannot be added, because _" # category # "_ is already a category.";
      Runtime.trap(hint);
    };
  };

  public shared ({ caller }) func addClip(
    title : Text,
    animeName : Text,
    category : Text,
    videoUrl : Text,
    thumbnailUrl : Text,
  ) : async Clip {
    let id = nextClipId;
    nextClipId += 1;

    let newClip : Clip = {
      id;
      title;
      animeName;
      category;
      videoUrl;
      thumbnailUrl;
      uploadDate = Time.now();
    };

    clips.add(id, newClip);
    addCategory(category);
    newClip;
  };

  public query ({ caller }) func getAllClips() : async [Clip] {
    clips.values().toArray().sort(
      Clip.compareByUploadDateDesc
    );
  };

  public query ({ caller }) func getClipsByCategory(category : Text) : async [Clip] {
    let filtered = clips.values().toArray().filter(
      func(clip) {
        Text.equal(clip.category.toLower(), category.toLower());
      }
    );
    filtered.sort(
      Clip.compareByUploadDateDesc
    );
  };

  public query ({ caller }) func searchClips(searchText : Text) : async [Clip] {
    let filtered = clips.values().toArray().filter(
      func(clip) {
        clip.title.toLower().contains(#text searchText) or
        clip.animeName.toLower().contains(#text searchText)
      }
    );
    filtered.sort(
      Clip.compareByUploadDateDesc
    );
  };

  public query ({ caller }) func getAllCategories() : async [Text] {
    let categoryList = List.empty<Text>();

    for (clip in clips.values()) {
      categoryList.add(clip.category);
    };

    let categories = Set.empty<Text>();
    for (category in categoryList.values()) {
      if (not categories.contains(category)) {
        categories.add(category);
      };
    };

    let resultList = List.empty<Text>();
    for (category in categories.toArray().values()) {
      resultList.add(category);
    };

    resultList.toArray();
  };

  public shared ({ caller }) func deleteClip(clipId : Nat) : async Bool {
    let existed = clips.containsKey(clipId);
    if (existed) {
      clips.remove(clipId);
    };
    existed;
  };

  public shared ({ caller }) func submitClipRequest(
    title : Text,
    animeName : Text,
    description : Text,
    requesterContact : Text,
  ) : async ClipRequest {
    let id = nextRequestId;
    nextRequestId += 1;

    let newRequest : ClipRequest = {
      id;
      title;
      animeName;
      description;
      requesterContact;
      status = "pending";
      requestDate = Time.now();
    };

    clipRequests.add(id, newRequest);
    newRequest;
  };

  public query ({ caller }) func getAllClipRequests() : async [ClipRequest] {
    clipRequests.values().toArray().sort(
      ClipRequest.compareByRequestDateDesc
    );
  };

  public shared ({ caller }) func updateRequestStatus(requestId : Nat, newStatus : Text) : async ?ClipRequest {
    switch (clipRequests.get(requestId)) {
      case (null) {
        null;
      };
      case (?existingRequest) {
        let updatedRequest = { existingRequest with status = newStatus };
        clipRequests.add(requestId, updatedRequest);
        ?updatedRequest;
      };
    };
  };

  public shared ({ caller }) func deleteClipRequest(requestId : Nat) : async Bool {
    let existed = clipRequests.containsKey(requestId);
    if (existed) {
      clipRequests.remove(requestId);
    };
    existed;
  };
};
